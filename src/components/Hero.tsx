/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { USER_INFO } from "../constants";
import heroPortrait from "../assets/hero_portrait.png";
import { fadeInUp, staggerContainer } from "../utils/motion";

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto py-xxl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="w-full max-w-2xl"
        >
          <motion.p variants={fadeInUp} className="label-caps mb-md">
            {USER_INFO.role}
          </motion.p>
          <motion.h1 variants={fadeInUp} className="font-display text-primary mb-lg w-full">
            Curious mind, always creating.
          </motion.h1>
          <motion.div variants={fadeInUp} className="text-lg text-on-surface-variant max-w-[600px] w-full space-y-4">
            {USER_INFO.summary.map((p, i) => (
              <p key={i} className="leading-relaxed w-full">{p}</p>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-xl flex flex-wrap gap-8">
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-600 uppercase tracking-widest mb-1 font-semibold">Status</span>
              <span className="flex items-center gap-2 text-sm font-mono text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                {USER_INFO.status}
              </span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-square w-full max-w-[500px] mx-auto lg:ml-auto overflow-hidden border border-zinc-800 bg-zinc-900 group rounded-full"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
          <img
            alt={USER_INFO.name}
            className="w-full h-full object-cover grayscale-[0.2] contrast-110 brightness-90 group-hover:grayscale-0 transition-all duration-700 ease-in-out"
            src={heroPortrait}
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
    </section>
  );
}
