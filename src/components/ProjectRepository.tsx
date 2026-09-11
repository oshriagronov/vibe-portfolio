/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { USER_INFO } from "../constants";
import { fadeInUp, staggerContainer } from "../utils/motion";
import {
  githubUsernameFromProfileUrl,
  type PinnedRepo,
} from "../utils/githubPinned";

const TRANSLATIONS = {
  en: {
    selectedWorks: "Selected Works",
    projectRepository: "Project Repository",
    syncingActivity: "Syncing Activity...",
    contributionsLastYear: "Contributions In The Last Year:",
    viewDetail: "View Detail",
    loadingWorks: "Loading pinned repositories...",
    emptyWorks: "No pinned repositories on GitHub yet.",
    errorWorks: "Could not load pinned repositories.",
    retry: "Retry"
  }
};

const PINNED_CACHE_PREFIX = "githubPinned_";
const CONTRIBUTIONS_CACHE_PREFIX = "githubContributionsLastYear_";

function cacheKey(username: string) {
  return `${PINNED_CACHE_PREFIX}${username}`;
}

function contributionsCacheKey(username: string) {
  return `${CONTRIBUTIONS_CACHE_PREFIX}${username}`;
}

function readCachedRepos(username: string): PinnedRepo[] | null {
  try {
    const cached = sessionStorage.getItem(cacheKey(username));
    if (!cached) return null;
    const parsed = JSON.parse(cached) as PinnedRepo[];
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function readCachedContributions(username: string): number | null {
  try {
    const cached = sessionStorage.getItem(contributionsCacheKey(username));
    if (cached == null) return null;
    const parsed = Number(cached);
    return Number.isFinite(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export default function ProjectRepository() {
  const [contributionsLastYear, setContributionsLastYear] = useState<number | null>(null);
  const [projects, setProjects] = useState<PinnedRepo[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);
  const locale = 'en';
  const t = TRANSLATIONS[locale];

  useEffect(() => {
    const controller = new AbortController();
    const username = githubUsernameFromProfileUrl(USER_INFO.githubUrl);
    if (!username) {
      setProjectsLoading(false);
      setProjectsError(t.errorWorks);
      return;
    }

    const cachedRepos = readCachedRepos(username);
    if (cachedRepos && cachedRepos.length > 0) {
      setProjects(cachedRepos);
      setProjectsLoading(false);
    }

    const cachedContributions = readCachedContributions(username);
    if (cachedContributions != null) {
      setContributionsLastYear(cachedContributions);
    }

    async function fetchPinnedRepos() {
      try {
        if (!cachedRepos?.length) {
          setProjectsLoading(true);
        }
        setProjectsError(null);

        const response = await fetch(
          `/api/pinned-repos?username=${encodeURIComponent(username)}`,
          { signal: controller.signal }
        );
        if (!response.ok) {
          throw new Error(`Pinned repos request failed (${response.status})`);
        }

        const data = (await response.json()) as {
          repos?: PinnedRepo[];
          contributionsLastYear?: number | null;
        };
        const repos = Array.isArray(data.repos) ? data.repos : [];
        setProjects(repos);
        sessionStorage.setItem(cacheKey(username), JSON.stringify(repos));

        if (typeof data.contributionsLastYear === "number") {
          setContributionsLastYear(data.contributionsLastYear);
          sessionStorage.setItem(
            contributionsCacheKey(username),
            String(data.contributionsLastYear)
          );
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return;
        console.error("Failed to fetch pinned repositories", error);
        if (!cachedRepos?.length) {
          setProjectsError(t.errorWorks);
        }
      } finally {
        setProjectsLoading(false);
      }
    }

    fetchPinnedRepos();

    return () => controller.abort();
  }, [reloadToken, t.errorWorks]);

  const showSkeletons = projectsLoading && projects.length === 0;

  return (
    <section id="works" className="px-6 md:px-12 max-w-7xl mx-auto py-xxl border-t border-zinc-900">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-xl gap-4">
        <div>
          <p className="label-caps mb-xs">{t.selectedWorks}</p>
          <h2 className="text-3xl font-semibold text-primary">{t.projectRepository}</h2>
        </div>
        <span className="text-xs font-mono text-zinc-500">
          {contributionsLastYear != null
            ? `${t.contributionsLastYear} ${contributionsLastYear.toLocaleString("en-US")}`
            : t.syncingActivity}
        </span>
      </div>

      {projectsError && projects.length === 0 ? (
        <div className="border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-on-surface-variant">{t.errorWorks}</p>
          <button
            type="button"
            onClick={() => setReloadToken((value) => value + 1)}
            className="text-[11px] font-mono text-zinc-400 hover:text-white transition-colors uppercase tracking-widest"
          >
            {t.retry}
          </button>
        </div>
      ) : showSkeletons ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-busy="true" aria-label={t.loadingWorks}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="border border-zinc-800 bg-zinc-900/50 p-6 animate-pulse">
              <div className="h-4 w-16 bg-zinc-800 mb-6" />
              <div className="h-6 w-40 bg-zinc-800 mb-4" />
              <div className="h-4 w-full bg-zinc-800 mb-2" />
              <div className="h-4 w-3/4 bg-zinc-800" />
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <p className="text-sm text-on-surface-variant">{t.emptyWorks}</p>
      ) : (
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={fadeInUp}
              className="group border border-zinc-800 bg-zinc-900/50 p-6 hover:bg-zinc-900 transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-mono text-white bg-black px-2 py-1 tracking-wider">
                  {project.tag}
                </span>
              </div>
              <h3 className="text-xl font-medium text-primary mb-4 group-hover:translate-x-1 transition-transform">
                {project.title}
              </h3>
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                {project.description}
              </p>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] font-mono text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity hover:text-white cursor-pointer"
              >
                {t.viewDetail} <ArrowUpRight size={12} />
              </a>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
