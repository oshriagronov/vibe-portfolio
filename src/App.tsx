/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Download, 
  ExternalLink, 
  Code2, 
  Hammer, 
  Layers, 
  Terminal, 
  MapPin, 
  Wrench, 
  GraduationCap, 
  Mail,
  ArrowUpRight,
  GitGraph
} from "lucide-react";
import { USER_INFO, PROJECTS, SKILLS, TIMELINE } from "./constants";

const IconMap = {
  Code2: Code2,
  Hammer: Hammer,
  Layers: Layers,
  Terminal: Terminal,
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function App() {
  const [githubActivity, setGithubActivity] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGithubStats() {
      try {
        const username = USER_INFO.githubUrl.split('/').pop();
        if (!username) return;
        
        // Attempt to get a sum of activity via Search API (commits)
        // Note: This is an approximation and subject to GitHub search limits
        const response = await fetch(`https://api.github.com/search/commits?q=author:${username}`, {
          headers: { 'Accept': 'application/vnd.github.cloak-preview' }
        });
        
        if (response.ok) {
          const data = await response.json();
          const total = data.total_count;
          setGithubActivity(total > 999 ? `${(total / 1000).toFixed(1)}k+` : `${total}`);
        } else {
          // Fallback to public repo count if search is limited
          const userRes = await fetch(`https://api.github.com/users/${username}`);
          if (userRes.ok) {
            const userData = await userRes.json();
            setGithubActivity(`${userData.public_repos} Projects`);
          }
        }
      } catch (error) {
        console.error("Failed to fetch Github stats", error);
      }
    }
    fetchGithubStats();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-zinc-800 flex justify-between items-center px-6 md:px-12 h-16">
        <div className="text-sm font-black tracking-widest text-white uppercase">
          OSHRI AGRONOV
        </div>
        <div className="flex items-center gap-6">
          <a 
            href={USER_INFO.cvUrl}
            className="flex items-center gap-2 font-sans tracking-tighter text-xs text-white border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all duration-200"
          >
            DOWNLOAD CV <Download size={14} />
          </a>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
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
                I'm {USER_INFO.name.split(' ')[0]} a curious mind, always creating.
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
                src={USER_INFO.portraitUrl}
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </section>

        {/* Project Repository */}
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
                  <span className="text-[10px] font-mono text-zinc-600 bg-black px-2 py-1 tracking-wider">
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

        {/* Skills & Background */}
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

        {/* Experience & Academic */}
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
                  
                  {item.location && (
                    <div className="flex items-center gap-2 text-zinc-600 font-mono text-[10px] uppercase mb-2">
                      <MapPin size={12} /> {item.location}
                    </div>
                  )}

                  {item.tags && (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="flex items-center gap-1 text-[10px] font-mono text-zinc-500 uppercase">
                          <Wrench size={10} /> {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
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
              href={`mailto:${USER_INFO.email}`}
              className="bg-white text-black px-10 py-4 rounded-full font-semibold hover:bg-zinc-200 transition-colors inline-flex items-center gap-2 shadow-xl"
            >
              SEND MESSAGE <Mail size={18} />
            </motion.a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-900 bg-black py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <div className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-mono">
              © {new Date().getFullYear()} {USER_INFO.name}
            </div>
            <div className="text-[9px] tracking-[0.1em] uppercase text-zinc-700 font-mono">
              Generated with Google Stitch & Polished with Google AI Studio
            </div>
          </div>
          
          <div className="flex gap-8">
            <a href={USER_INFO.githubUrl} className="text-[10px] tracking-[0.2em] uppercase text-zinc-600 hover:text-white transition-all font-mono">GITHUB</a>
            <a href={USER_INFO.linkedinUrl} className="text-[10px] tracking-[0.2em] uppercase text-zinc-600 hover:text-white transition-all font-mono">LINKEDIN</a>
            <a href={USER_INFO.twitterUrl} className="text-[10px] tracking-[0.2em] uppercase text-zinc-600 hover:text-white transition-all font-mono">X</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
