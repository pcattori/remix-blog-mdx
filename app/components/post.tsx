import { Link } from "@remix-run/react";

import type { PostMeta } from "~/.server/posts";

export const Post = ({ slug, frontmatter }: PostMeta) => {
  return (
    <article className="space-y-2">
      <Link to={`/blog/${slug}`}>
        <h3 className="text-3xl font-bold">{frontmatter.title}</h3>
      </Link>
      <p className="text-gray-600">{frontmatter.description}</p>
      <time
        className="block text-sm text-cyan-700"
        dateTime={frontmatter.published}
      >
        {frontmatter.published.replace(/-/g, "/")}
      </time>
    </article>
  );
};
