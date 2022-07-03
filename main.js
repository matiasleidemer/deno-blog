import blog, { ga } from "https://deno.land/x/blog@0.3.3/blog.tsx";
import "https://esm.sh/prismjs@1.27.0/components/prism-ruby";

blog({
  author: "Matias",
  title: "Matias Leidemer",
  description: "software developer",
  avatar: "avatar.jpg",
  avatarClass: "rounded-full",
  links: [
    { title: "GitHub", url: "https://github.com/matiasleidemer" },
    { title: "Twitter", url: "https://twitter.com/matiasleidemer" },
  ],
  lang: "en",
  timezone: "en-US",
  middlewares: [ga("UA-XXXXXXXX-X")],
});
