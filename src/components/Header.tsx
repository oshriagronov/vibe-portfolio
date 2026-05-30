/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Download } from "lucide-react";
import { USER_INFO } from "../constants";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-zinc-800 flex justify-between items-center px-6 md:px-12 h-16">
      <div className="text-sm font-black tracking-widest text-white uppercase">
        {USER_INFO.name.toUpperCase()}
      </div>
      <div className="flex items-center gap-6">
        <a
          href={USER_INFO.cvUrl}
          download="Oshri_Agronov_CV.pdf"
          className="flex items-center gap-2 font-sans tracking-tighter text-xs text-white border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all duration-200"
        >
          DOWNLOAD CV <Download size={14} />
        </a>
      </div>
    </header>
  );
}
