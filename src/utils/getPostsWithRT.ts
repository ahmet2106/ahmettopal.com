import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";

type BlogFrontmatter = CollectionEntry<"blog">["data"];

const getPostSlug = (frontmatter: BlogFrontmatter) =>
  frontmatter.slug ?? slugifyStr(frontmatter.title);

const getReadingTimeMap = async () => {
  const globPosts = import.meta.glob("../content/blog/**/*.md") as Record<
    string,
    () => Promise<{ frontmatter: BlogFrontmatter }>
  >;

  const mapFrontmatter = new Map<string, string | undefined>();

  await Promise.all(
    Object.values(globPosts).map(async globPost => {
      const { frontmatter } = await globPost();
      mapFrontmatter.set(getPostSlug(frontmatter), frontmatter.readingTime);
    })
  );

  return mapFrontmatter;
};

const getPostsWithRT = async (posts: CollectionEntry<"blog">[]) => {
  const mapFrontmatter = await getReadingTimeMap();
  return posts.map(post => {
    post.data.readingTime = mapFrontmatter.get(post.slug);
    return post;
  });
};

export default getPostsWithRT;
