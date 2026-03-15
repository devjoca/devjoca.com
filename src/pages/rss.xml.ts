import { SITE } from "src/config";
import rss from "@astrojs/rss";
import type { Frontmatter } from "src/types";
import type { MarkdownInstance } from "astro";
import slugify from "@utils/slugify";
import sanitizeHtml from "sanitize-html";

const postImportResult = import.meta.glob<MarkdownInstance<Frontmatter>>(
  "../contents/**/*.md",
  {
    eager: true,
  }
);
const posts = Object.values(postImportResult);

export const GET = () =>
  rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: posts
      .filter(({ frontmatter }) => !frontmatter.draft)
      .map(post => {
        const content = sanitizeHtml(post.compiledContent(), {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        });
        return {
          link: `posts/${slugify(post.frontmatter)}`,
          title: post.frontmatter.title,
          description: post.frontmatter.description,
          pubDate: new Date(post.frontmatter.datetime),
          ...(content && { content }),
        };
      }),
  });
