import { error } from "@sveltejs/kit";
import { videos } from "../../../videos.js";

const pageSize = 6;
const pageCount = Math.ceil(videos.length / pageSize);

export function load({ params }) {
  const page = Number(params.page);
  if (page > pageCount) {
    error(404, "Page not found");
  }

  return { page };
}
