/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Mail } from "lucide-react";
import { USER_INFO } from "../constants";

export default function Contact() {
  return (
    <section className="px-6 md:px-12 max-w-7xl mx-auto py-xxl border-t border-zinc-900 bg-black">
      <div className="flex flex-col items-center text-center py-20 w-full">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-7xl font-semibold text-white mb-8 tracking-tighter w-full"
        >
          Building Together.
        </motion.h2>
        <p className="text-lg text-zinc-400 mb-10 max-w-[600px] w-full mx-auto leading-relaxed">
          Always open to discussing ideas or collaborating on innovative projects.
        </p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(USER_INFO.email)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black px-10 py-4 rounded-full font-semibold hover:bg-zinc-200 transition-colors inline-flex items-center gap-2 shadow-xl"
        >
          SEND MESSAGE <Mail size={18} />
        </motion.a>
      </div>
    </section>
  );
}
