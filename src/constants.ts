/**
 * Portfolio Data Constants
 * Change these values to update your portfolio details.
 */

export const USER_INFO = {
  name: "Oshri Agronov",
  role: "Software Engineering Student",
  location: "Israel",
  email: "perch-robe-drool@duck.com",
  summary: [
    "I'm a passionate developer who loves turning ideas into real products.",
    "Constantly sharpening my skills in modern programming languages, frameworks, and cutting-edge technologies."
  ],
  status: "Currently: Defense Company Intern",
  portraitUrl: "https://lh3.googleusercontent.com/aida/ADBb0ui4JNLu-vNiccEso0bjdEXN0d2Rr5WkZHUq_oMWgI8PBepnO-HW_FP_w3jLx2Dq-ufZudbXYk2JfHMibms-G7WJIqix2AawAId79fBTJTnK6E1i2Efa4mPMpxViaEf-o1nhxbrcNtsClCJ3Ap7wY348kkjvcgO3ZCWeKjU5FqbOCkFM8qyjtgB2FTcr-1pCkR3gTnfne7jX9dBTMJD6T9fPlF2rKXdB3w4PritIU1n-m-qlyFc_iNaifORLFk0U9xBYVasHnvs3wA",
  githubUrl: "https://github.com/oshriagronov",
  linkedinUrl: "https://www.linkedin.com/in/oshri-agronov/",
  twitterUrl: "https://x.com/oshriagronov",
  cvUrl: "#",
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
    company: "Defense Company",
    role: "Software Engineering Intern",
    period: "2025 — PRESENT",
    description: "Built and maintained a containerized monitoring system using Docker, developed Python scripts for automated data processing, and wrote C++ programs for hardware-level integration.",
    type: "work",
  },
  {
    id: "edu-braude",
    company: "Braude Academic College",
    role: "B.S. in Software Engineering",
    period: "2023 — PRESENT",
    description: "Relevant Coursework: Operating Systems, Data Structures and Introduction to Algorithms, Algorithms, Object Oriented Programming",
    type: "edu",
  },
  {
    id: "work-navy",
    company: "Israeli Navy",
    role: "Electronic Technician • Full-time",
    period: "SEP 2020 — JUL 2023",
    description: "Performed electrical and mechanical maintenance, managed transportation operations, and conducted technical measurements.",
    location: "Israel",
    tags: ["Maintenance & Repair", "Mechanics", "+4 more"],
    type: "work",
  },
  {
    id: "edu-navy-school",
    company: "Navy Officers School",
    role: "Electronics and Computers Practical engineer",
    period: "SEP 2018 — JUN 2020",
    tags: ["Electronics", "VHDL", "+5 more"],
    type: "edu",
  },
];
