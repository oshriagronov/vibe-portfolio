/**
 * Parse GitHub profile HTML for pinned repositories.
 * GitHub's REST API does not expose profile pins; the GraphQL API requires a token.
 * Profile HTML is the public source of truth for pin order.
 */

export type PinnedRepo = {
  id: string;
  title: string;
  tag: string;
  description: string;
  repoUrl: string;
};

const GITHUB_USERNAME_RE = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;

export function isGithubUsername(value: string): boolean {
  return GITHUB_USERNAME_RE.test(value);
}

export function githubUsernameFromProfileUrl(url: string): string | null {
  try {
    const pathname = new URL(url).pathname.replace(/\/+$/, "");
    const username = pathname.split("/").filter(Boolean)[0];
    return username && isGithubUsername(username) ? username : null;
  } catch {
    return null;
  }
}

function decodeHtml(value: string): string {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/\s+/g, " ")
    .trim();
}

export function parsePinnedReposFromProfileHtml(html: string): PinnedRepo[] {
  const listStart = html.indexOf("js-pinned-items-reorder-list");
  if (listStart === -1) {
    throw new Error("Pinned repositories markup not found");
  }

  const listEnd = html.indexOf("</ol>", listStart);
  const listHtml = listEnd === -1 ? html.slice(listStart) : html.slice(listStart, listEnd);
  const items = listHtml.match(/<li\b[\s\S]*?<\/li>/g) ?? [];
  const repos: PinnedRepo[] = [];

  for (const item of items) {
    const repoLinkMatch = item.match(
      /href="(\/[^"]+)"[^>]*>\s*<span class="repo">([^<]+)<\/span>/
    );
    if (!repoLinkMatch) continue;

    const href = repoLinkMatch[1].split("?")[0];
    const title = decodeHtml(repoLinkMatch[2]);
    if (!title) continue;

    const descMatch = item.match(/<p class="pinned-item-desc[^"]*">([\s\S]*?)<\/p>/);
    const langMatch = item.match(/itemprop="programmingLanguage">([^<]+)<\/span>/);
    const language = langMatch ? decodeHtml(langMatch[1]) : "";

    repos.push({
      id: href.replace(/^\//, "").replace(/\//g, "-"),
      title,
      tag: language ? language.toUpperCase() : "REPO",
      description: descMatch ? decodeHtml(descMatch[1]) : "",
      repoUrl: `https://github.com${href}`,
    });
  }

  return repos;
}

const GITHUB_HTML_HEADERS = {
  Accept: "text/html,application/xhtml+xml",
  "User-Agent":
    "Mozilla/5.0 (compatible; vibe-portfolio/1.0; +https://github.com/oshriagronov/vibe-portfolio)",
};

async function fetchGithubHtml(url: string, errorLabel: string): Promise<string> {
  const response = await fetch(url, { headers: GITHUB_HTML_HEADERS });
  if (!response.ok) {
    throw new Error(`${errorLabel} failed (${response.status})`);
  }
  return response.text();
}

export async function fetchGithubPinnedRepos(username: string): Promise<PinnedRepo[]> {
  if (!isGithubUsername(username)) {
    throw new Error("Invalid GitHub username");
  }

  const html = await fetchGithubHtml(
    `https://github.com/${encodeURIComponent(username)}`,
    "GitHub profile request"
  );
  return parsePinnedReposFromProfileHtml(html);
}

export function parseLastYearContributions(html: string): number {
  const headingMatch = html.match(
    /id="js-contribution-activity-description"[^>]*>\s*([\d,]+)\s+contributions/i
  );
  if (headingMatch) {
    return Number.parseInt(headingMatch[1].replace(/,/g, ""), 10);
  }

  let total = 0;
  let foundDay = false;
  const dayRe = /(?:No contributions|(\d+) contributions?) on /g;
  for (const match of html.matchAll(dayRe)) {
    foundDay = true;
    total += match[1] ? Number.parseInt(match[1], 10) : 0;
  }
  if (foundDay) return total;

  throw new Error("Last-year contribution total not found");
}

export async function fetchGithubLastYearContributions(username: string): Promise<number> {
  if (!isGithubUsername(username)) {
    throw new Error("Invalid GitHub username");
  }

  const html = await fetchGithubHtml(
    `https://github.com/users/${encodeURIComponent(username)}/contributions`,
    "GitHub contributions request"
  );
  return parseLastYearContributions(html);
}

export function jsonResponse(body: unknown, status = 200, cacheSeconds = 0): Response {
  const headers: Record<string, string> = {
    "Content-Type": "application/json; charset=utf-8",
  };
  if (status === 200 && cacheSeconds > 0) {
    headers["Cache-Control"] = `public, s-maxage=${cacheSeconds}, stale-while-revalidate=86400`;
  } else {
    headers["Cache-Control"] = "no-store";
  }
  return new Response(JSON.stringify(body), { status, headers });
}

export async function handlePinnedReposRequest(requestUrl: string): Promise<Response> {
  const username = new URL(requestUrl, "http://localhost").searchParams.get("username") ?? "";
  if (!isGithubUsername(username)) {
    return jsonResponse({ error: "Invalid GitHub username" }, 400);
  }

  const [reposResult, contributionsResult] = await Promise.allSettled([
    fetchGithubPinnedRepos(username),
    fetchGithubLastYearContributions(username),
  ]);

  if (reposResult.status === "rejected") {
    const message =
      reposResult.reason instanceof Error
        ? reposResult.reason.message
        : "Failed to load pinned repositories";
    return jsonResponse({ error: message }, 502);
  }

  const contributionsLastYear =
    contributionsResult.status === "fulfilled" &&
    Number.isFinite(contributionsResult.value)
      ? contributionsResult.value
      : null;

  return jsonResponse({ repos: reposResult.value, contributionsLastYear }, 200, 300);
}
