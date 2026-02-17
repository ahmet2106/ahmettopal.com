import type { CollectionEntry } from "astro:content";

export const getPostYear = (post: CollectionEntry<"blog">) =>
  String(new Date(post.data.pubDatetime).getUTCFullYear());

export const getPostUrl = (post: CollectionEntry<"blog">) =>
  `/posts/${getPostYear(post)}/${post.slug}/`;
