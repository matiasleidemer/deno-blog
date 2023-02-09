/** @jsx h */

import blog, { ga } from "blog";

import "https://esm.sh/prismjs@1.29.0/components/prism-ruby";

blog({
  title: "matiasleidemer.dev",
  description: "I write code that writes code.",
  avatar: "avatar.jpg",
  avatarClass: "rounded-full",
  author: "Matias Leidemer",
  dateStyle: "medium",
  lang: "en",
  links: [
    { title: "GitHub", url: "https://github.com/matiasleidemer" },
    { title: "Twitter", url: "https://twitter.com/matiasleidemer" },
  ],
  middlewares: [ga("G-V2GGPKXXC3")],
});
