import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "@config";
import { getPostUrl } from "@utils/getPostInfo";
import getPageNumbers from "@utils/getPageNumbers";
import getPostsByTag from "@utils/getPostsByTag";
import getSortedPosts from "@utils/getSortedPosts";
import getUniqueTags from "@utils/getUniqueTags";

const toAbsoluteUrl = (pathname: string) => new URL(pathname, SITE.website).href;

const toLastmod = (date: Date | null | undefined) =>
  date ? new Date(date).toISOString() : undefined;

const toUrlEntry = (loc: string, lastmod?: string) =>
  `<url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`;

export const GET: APIRoute = async () => {
  const posts = await getCollection("blog");
  const sortedPosts = await getSortedPosts(posts);
  const tags = getUniqueTags(posts);

  const urls = new Set<string>();

  const staticPaths = ["/", "/about/", "/posts/", "/search/", "/tags/", "/rss.xml"];
  staticPaths.forEach(path => urls.add(toAbsoluteUrl(path)));

  const postPages = getPageNumbers(sortedPosts.length).filter(page => page > 1);
  postPages.forEach(page => urls.add(toAbsoluteUrl(`/posts/${page}/`)));

  const postEntries = sortedPosts.map(post => {
    const loc = toAbsoluteUrl(getPostUrl(post));
    const lastmod = toLastmod(post.data.modDatetime ?? post.data.pubDatetime);
    urls.add(loc);
    return toUrlEntry(loc, lastmod);
  });

  for (const { tag } of tags) {
    urls.add(toAbsoluteUrl(`/tags/${tag}/`));
    const tagPosts = await getPostsByTag(posts, tag);
    const tagPages = getPageNumbers(tagPosts.length).filter(page => page > 1);
    tagPages.forEach(page => urls.add(toAbsoluteUrl(`/tags/${tag}/${page}/`)));
  }

  const staticEntries = [...urls]
    .filter(loc => !postEntries.some(entry => entry.includes(`<loc>${loc}</loc>`)))
    .sort()
    .map(loc => toUrlEntry(loc));

  const body = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...staticEntries,
    ...postEntries,
    `</urlset>`,
  ].join("");

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
