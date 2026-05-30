/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { USER_INFO, PROJECTS } from "../constants";
import { fadeInUp, staggerContainer } from "../utils/motion";

export default function ProjectRepository() {
  const [githubActivity, setGithubActivity] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGithubStats() {
      try {
        const username = USER_INFO.githubUrl.split('/').pop();
        if (!username) return;

        const cached = sessionStorage.getItem(`githubStats_${username}`);
        if (cached) {
          setGithubActivity(cached);
          return;
        }

        // Attempt to get a sum of activity via Search API (commits)
        // Note: This is an approximation and subject to GitHub search limits
        const response = await fetch(`https://api.github.com/search/commits?q=author:${username}`, {
          headers: { 'Accept': 'application/vnd.github.cloak-preview' }
        });

        if (response.ok) {
          const data = await response.json();
          const total = data.total_count;
          const resultStr = total > 999 ? `${(total / 1000).toFixed(1)}k+` : `${total}`;
          setGithubActivity(resultStr);
          sessionStorage.setItem(`githubStats_${username}`, resultStr);
        } else {
          // Fallback to public repo count if search is limited
          const userRes = await fetch(`https://api.github.com/users/${username}`);
          if (userRes.ok) {
            const userData = await userRes.json();
            const resultStr = `${userData.public_repos} Projects`;
            setGithubActivity(resultStr);
            sessionStorage.setItem(`githubStats_${username}`, resultStr);
          }
        }
      } catch (error) {
        console.error("Failed to fetch Github stats", error);
      }
    }
    fetchGithubStats();
  }, []);

  return (
    <section id="works" className="px-6 md:px-12 max-w-7xl mx-auto py-xxl border-t border-zinc-900">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-xl gap-4">
        <div>
          <p className="label-caps mb-xs">Selected Works</p>
          <h2 className="text-3xl font-semibold text-primary">Project Repository</h2>
        </div>
        <span className="text-xs font-mono text-zinc-500">
          {githubActivity ? `Total Commits: ${githubActivity}` : 'Syncing Activity...'}
        </span>
      </div>

      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {PROJECTS.map((project) => (
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
              View Detail <ArrowUpRight size={12} />
            </a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
