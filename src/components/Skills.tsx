/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import {
  Code2,
  Hammer,
  Layers,
  Terminal
} from "lucide-react";
import { SKILLS } from "../constants";
import { fadeInUp } from "../utils/motion";

const IconMap = {
  Code2: Code2,
  Hammer: Hammer,
  Layers: Layers,
  Terminal: Terminal,
};

export default function Skills() {
  return (
    <section className="bg-zinc-900/30 border-y border-zinc-900 py-xxl">
      <div className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-xl">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h3 className="label-caps mb-lg">Languages</h3>
          <ul className="space-y-4">
            {SKILLS.languages.map((skill) => (
              <li key={skill.name} className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-sm text-primary">{skill.name}</span>
                <span className="text-xs font-mono text-zinc-600">{skill.level}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h3 className="label-caps mb-lg">Domains</h3>
          <div className="flex flex-wrap gap-2">
            {SKILLS.domains.map((domain) => (
              <span key={domain} className="bg-zinc-800 text-white px-3 py-1 text-[10px] font-mono uppercase tracking-wider">
                {domain}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h3 className="label-caps mb-lg">Tooling</h3>
          <ul className="space-y-4">
            {SKILLS.tooling.map((tool) => {
              const Icon = IconMap[tool.icon as keyof typeof IconMap] || Terminal;
              return (
                <li key={tool.name} className="flex items-center gap-3">
                  <Icon className="text-zinc-500" size={18} />
                  <span className="text-sm text-primary">{tool.name}</span>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
