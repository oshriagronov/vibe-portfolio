/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { USER_INFO } from "../constants";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-900 bg-black py-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <div className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-mono">
            © {new Date().getFullYear()} {USER_INFO.name}
          </div>
          <div className="text-[9px] tracking-[0.1em] uppercase text-zinc-500 font-mono">
            Generated with Google Stitch & Polished with Google AI Studio and Antigravity
          </div>
        </div>

        <div className="flex gap-8">
          <a href={USER_INFO.githubUrl} className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-all font-mono">GITHUB</a>
          <a href={USER_INFO.linkedinUrl} className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-all font-mono">LINKEDIN</a>
          <a href={USER_INFO.twitterUrl} className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-all font-mono">X</a>
        </div>
      </div>
    </footer>
  );
}
