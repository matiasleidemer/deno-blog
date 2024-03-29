/** @jsx h */

import blog, { ga } from "deno_blog/main/blog.tsx";

import "https://esm.sh/prismjs@1.29.0/components/prism-ruby";

blog({
  title: "matiasleidemer.dev",
  description: "I write code that writes code.",
  avatar: "avatar.webp",
  avatarClass: "rounded-full",
  author: "Matias Leidemer",
  readtime: true,
  dateFormat: (date) =>
    new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(date),
  lang: "en",
  links: [
    { title: "GitHub", url: "https://github.com/matiasleidemer" },
    { title: "Twitter", url: "https://twitter.com/matiasleidemer" },
    { title: "Linkedin", url: "https://www.linkedin.com/in/matiasleidemer/" },
  ],
  middlewares: [ga("G-V2GGPKXXC3")],
});
