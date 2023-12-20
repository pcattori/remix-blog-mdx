import { Link } from "@remix-run/react";

type Frontmatter = {
  title: string;
  description: string;
  published: string; // YYYY-MM-DD
  featured: boolean;
};

type Post = {
  slug: string;
  frontmatter: Frontmatter;
};

const slug = (filename: string) =>
  filename
    .replace(/^\.\/routes/, "")
    .replace(/\.mdx$/, "")
    .replace(/\./, "/");

export const getPosts = (): Post[] => {
  const modules = import.meta.glob<{ frontmatter: Frontmatter }>(
    "./routes/blog.*.mdx",
    { eager: true }
  );
  const posts = Object.entries(modules).map(([file, post]) => ({
    slug: slug(file),
    frontmatter: post.frontmatter,
  }));
  posts.sort((a, b) => {
    if (a.frontmatter.published < b.frontmatter.published) {
      return 1;
    } else if (a.frontmatter.published > b.frontmatter.published) {
      return -1;
    } else {
      return 0;
    }
  });
  return posts;
};

export const Post = ({ slug, frontmatter }: Post) => {
  return (
    <article className="space-y-2">
      <Link to={slug}>
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
