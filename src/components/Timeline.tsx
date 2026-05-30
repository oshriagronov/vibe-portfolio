/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { TIMELINE } from "../constants";

export default function Timeline() {
  return (
    <section className="px-6 md:px-12 max-w-7xl mx-auto py-xxl">
      <div className="max-w-4xl">
        <p className="label-caps mb-xs">Background</p>
        <h2 className="text-3xl font-semibold text-primary mb-xl">Professional Timeline</h2>

        <div className="space-y-12">
          {TIMELINE.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-8 border-l border-zinc-800"
            >
              <div className={`absolute -left-1.5 top-0 w-3 h-3 ${item.type === 'work' ? 'bg-white' : 'border border-white bg-black'}`}></div>
              <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-2">
                <div>
                  <h4 className="text-xl font-medium text-primary">{item.company}</h4>
                  <p className="text-sm text-zinc-400">{item.role}</p>
                </div>
                <span className="text-xs font-mono text-zinc-500">{item.period}</span>
              </div>
              <p className="text-sm text-on-surface-variant max-w-2xl mb-4 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
