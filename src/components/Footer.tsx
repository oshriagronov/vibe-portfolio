/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { USER_INFO } from "../constants";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-900 bg-black py-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-xs tracking-[0.2em] uppercase text-zinc-400 font-mono">
          © {CURRENT_YEAR} {USER_INFO.name}
        </div>

        <div className="flex gap-8">
          <a
            href={USER_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-all font-mono"
          >
            GITHUB
          </a>
          <a
            href={USER_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-all font-mono"
          >
            LINKEDIN
          </a>
          <a
            href={USER_INFO.twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-all font-mono"
          >
            X
          </a>
        </div>
      </div>
    </footer>
  );
}
