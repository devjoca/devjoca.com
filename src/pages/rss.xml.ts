import { SITE } from "src/config";
import rss from "@astrojs/rss";
import type { Frontmatter } from "src/types";
import type { MarkdownInstance } from "astro";
import slugify from "@utils/slugify";
import sanitizeHtml from "sanitize-html";

const postImportResult = import.meta.glob<MarkdownInstance<Frontmatter>>(
  "../contents/**/*.{md,mdx}",
  {
    eager: true,
  }
);
const posts = Object.values(postImportResult);

export const GET = async () => {
  const items = await Promise.all(
    posts
      .filter(({ frontmatter }) => !frontmatter.draft)
      .map(async post => {
        const raw =
          typeof post.compiledContent === "function"
            ? await post.compiledContent()
            : "";
        const content = raw
          ? sanitizeHtml(String(raw), {
              allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
            })
          : "";
        return {
          link: `posts/${slugify(post.frontmatter)}`,
          title: post.frontmatter.title,
          description: post.frontmatter.description,
          pubDate: new Date(post.frontmatter.datetime),
          ...(content && { content }),
        };
      })
  );

  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items,
  });
};
