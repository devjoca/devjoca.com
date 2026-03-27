import type { SocialObjects } from "./types";

export const SITE = {
  website: "https://devjoca.com",
  author: "Joca Pereyra",
  desc: "Backend developer writing about AI agents, LLMs, retrieval systems, and building practical tools with Python and TypeScript.",
  title: "devjoca",
  ogImage: "devjoca-og.png",
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
