import adapter from "@sveltejs/adapter-static";
import { videos } from "./src/videos.js";

const pageSize = 6;
const pageCount = Math.ceil(videos.length / pageSize);

const config = {
  kit: {
    files: {
      assets: "public",
    },
    adapter: adapter({
      pages: "dist",
      assets: "dist",
    }),
    prerender: {
      entries: ["/", ...Array.from({ length: pageCount }, (_, index) => `/music/${index + 1}/`)],
    },
  },
};

export default config;
