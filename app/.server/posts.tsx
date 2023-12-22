export type Frontmatter = {
  title: string;
  description: string;
  published: string; // YYYY-MM-DD
  featured: boolean;
};

export type PostMeta = {
  slug: string;
  frontmatter: Frontmatter;
};

const slug = (filename: string) =>
  filename
    .replace("../routes/", "")
    .replace(/\.mdx$/, "")
    .replace(/\./, "/");

export const getPosts = (): PostMeta[] => {
  const modules = import.meta.glob<{ frontmatter: Frontmatter }>(
    "../routes/blog.*.mdx",
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

export const getFeaturedPosts = (): PostMeta[] => {
  return getPosts().filter((post) => post.frontmatter.featured);
};
