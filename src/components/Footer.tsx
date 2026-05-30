/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { USER_INFO } from "../constants";

const CURRENT_YEAR = new Date().getFullYear();
// Lightweight internationalization (i18n) dictionary
const TRANSLATIONS = {
  en: {
    credits: "Generated with Google Stitch & Polished with Google AI Studio and Antigravity",
    github: "GITHUB",
    linkedin: "LINKEDIN",
    twitter: "X"
  }
};

export default function Footer() {
  const locale = 'en'; // Default language setting, easily configurable in the future
  const t = TRANSLATIONS[locale];

  return (
    <footer className="w-full border-t border-zinc-900 bg-black py-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <div className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-mono">
            © {CURRENT_YEAR} {USER_INFO.name}
          </div>
          <div className="text-[9px] tracking-[0.1em] uppercase text-zinc-500 font-mono">
            {t.credits}
          </div>
        </div>

        <div className="flex gap-8">
          <a href={USER_INFO.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-all font-mono">GITHUB</a>
          <a href={USER_INFO.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-all font-mono">LINKEDIN</a>
          <a href={USER_INFO.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-all font-mono">X</a>
        </div>
      </div>
    </footer>
  );
}
