import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://ahmettopal.com/", // replace this with your deployed domain
  author: "Ahmet Topal",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "Ahmet Topal",
  ogImage: "og-image.png",
  lightAndDarkMode: true,
  postPerPage: 20,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "X",
    href: "https://x.com/ahmettopal",
    linkTitle: `@ahmettopal on X`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:hello@ahmettopal.com",
    linkTitle: `send ahmet a mail`,
    active: true,
  },
];
