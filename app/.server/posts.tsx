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

export const getPosts = (): PostMeta[] => {
  const modules = import.meta.glob<{ frontmatter: Frontmatter }>(
    "../routes/blog.*.mdx",
    { eager: true }
  );
  const posts = Object.entries(modules).map(([file, post]) => {
    let slug =
      "/" +
      file
        .replace("../routes/", "")
        .replace(/\.mdx$/, "")
        .replace(/\./, "/");
    return {
      slug,
      frontmatter: post.frontmatter,
    };
  });
  return sortBy(posts, (post) => post.frontmatter.published, "desc");
};

function sortBy<T>(
  arr: T[],
  key: (item: T) => any,
  dir: "asc" | "desc" = "asc"
) {
  return arr.sort((a, b) => {
    const res = compare(key(a), key(b));
    return dir === "asc" ? res : -res;
  });
}

function compare<T>(a: T, b: T): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
