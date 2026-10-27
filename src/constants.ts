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
    "Constantly sharpening my skills in modern programming languages, frameworks, and cutting-edge technologies.",
  ],
  status: "Currently: Defense Company",
  githubUrl: "https://github.com/oshriagronov",
  linkedinUrl: "https://www.linkedin.com/in/oshri-agronov/",
  twitterUrl: "https://x.com/oshriagronov",
  cvUrl: cvFile,
};

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
    period: "DEC 2025 — PRESENT",
    description:
      "developing real-time, Linux-based systems that integrate hardware and communication interfaces, with an emphasis on clean architecture and automated testing. I also built a Docker-based monitoring solution and Python tools for automated data processing.",
    type: "work",
  },
  {
    id: "edu-braude",
    company: "Braude Academic College",
    role: "B.S. in Software Engineering",
    period: "JAN 2024 — PRESENT",
    description:
      "Relevant Coursework: Operating Systems, Data Structures and Introduction to Algorithms, Algorithms, Object Oriented Programming",
    type: "edu",
  },
  {
    id: "work-navy",
    company: "Israeli Navy",
    role: "Electronic Technician • Military Service",
    period: "SEP 2020 — JUL 2023",
    description:
      "Performed electrical and mechanical maintenance, managed transportation operations, and conducted technical measurements.",
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
