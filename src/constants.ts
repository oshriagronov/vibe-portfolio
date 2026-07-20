/**
 * Portfolio Data Constants
 * Change these values to update your portfolio details.
 */

import cvFile from "./assets/cv.pdf";

export const USER_INFO = {
  name: "Oshri Agronov",
  role: "Software Engineering Student",
  email: "perch-robe-drool@duck.com",
  summary: [
    "I'm a passionate developer who loves turning ideas into real products.",
    "Constantly sharpening my skills in modern programming languages, frameworks, and cutting-edge technologies."
  ],
  status: "Currently: Rafael Advanced Defense Systems",
  portraitUrl: "/src/assets/hero_portrait.png",
  githubUrl: "https://github.com/oshriagronov",
  linkedinUrl: "https://www.linkedin.com/in/oshri-agronov/",
  twitterUrl: "https://x.com/oshriagronov",
  cvUrl: cvFile,
};

export const PROJECTS = [
  {
    id: "pokemmo-companion",
    title: "pokemmo-companion",
    tag: "REACT",
    description: "Your ultimate companion for PokeMMO. Discover type matchups, encounter locations, evolutions, and the best moves for every Pokemon.",
    repoUrl: "https://github.com/oshriagronov/pokemmo-companion",
  },
  {
    id: "local-chat",
    title: "local-chat",
    tag: "PYTHON",
    description: "A lightweight desktop GUI for chatting with open-source language models locally, featuring multiple modes, optional web search, and full offline privacy.",
    repoUrl: "https://github.com/oshriagronov/local-chat",
  },
  {
    id: "brick-breaker",
    title: "brick-breaker",
    tag: "JAVA",
    description: "Classic Brick Breaker game built in Java using Swing and AWT, showcasing object-oriented design, game loop mechanics, and customizable gameplay features.",
    repoUrl: "https://github.com/oshriagronov/brick-breaker",
  },
  {
    id: "dino-game",
    title: "dino-game",
    tag: "C++",
    description: "A simple C++ clone of Chrome’s offline Dinosaur game built with SDL2, focusing on core game mechanics, animation, and object-oriented design.",
    repoUrl: "https://github.com/oshriagronov/dino-game",
  },
];

export const SKILLS = {
  languages: [
    { name: "React", level: "Intermediate" },
    { name: "C / C++", level: "Advanced" },
    { name: "Python", level: "Intermediate" },
    { name: "Java", level: "Intermediate" },
  ],
  domains: ["Containerization & Microservices", "Fullstack", "RT Embedded"],
  tooling: [
    { name: "Git", icon: "Code2" },
    { name: "CMake", icon: "Hammer" },
    { name: "Docker", icon: "Layers" },
    { name: "Linux", icon: "Terminal" },
  ],
};

export const TIMELINE = [
  {
    id: "work-intern",
    company: "Rafael Advanced Defense Systems",
    role: "Software Engineering Intern",
    period: "DEC 2025 — PRESENT",
    description: "Built and maintained a containerized monitoring system using Docker, developed Python scripts for automated data processing, and wrote C++ programs for hardware-level integration.",
    type: "work",
  },
  {
    id: "edu-braude",
    company: "Braude Academic College", 
    role: "B.S. in Software Engineering",
    period: "JAN 2024 — PRESENT",
    description: "Relevant Coursework: Operating Systems, Data Structures and Introduction to Algorithms, Algorithms, Object Oriented Programming",
    type: "edu",
  },
  {
    id: "work-navy",
    company: "Israeli Navy",
    role: "Electronic Technician • Military Service",
    period: "SEP 2020 — JUL 2023",
    description: "Performed electrical and mechanical maintenance, managed transportation operations, and conducted technical measurements.",
    type: "work",
  },
  {
    id: "edu-navy-school",
    company: "Navy Officers School",
    role: "Electronics and Computers Practical engineer",
    period: "SEP 2018 — JUN 2020",
    type: "edu",
  },
];
