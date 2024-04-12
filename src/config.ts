import type { SocialObjects } from "./types";

export const SITE = {
  website: "https://devjoca.com",
  author: "Joca Pereyra",
  desc: "Welcome to Joca's tech blog! Join me, a seasoned backend developer, as I delve into the latest advancements in technology and AI/ML. I bring expertise in PHP, Python, Node.js, and TypeScript, and share my knowledge and insights through tutorials and tips. Stay ahead of the game and join me on this journey to continually improve and explore the world of software engineering.",
  title: "devjoca",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 3,
};

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/devjoca",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/josecarlos-pereyra",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:jpereyraleon@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: false,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/devjoca",
    linkTitle: `${SITE.title} on Twitter`,
    active: false,
  },
];
