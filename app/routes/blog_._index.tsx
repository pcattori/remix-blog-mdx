import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getPosts } from "~/.server/posts";
import { Post } from "~/components/post";

export const loader = () => json(getPosts());

export default function Component() {
  const posts = useLoaderData<typeof loader>();

  return (
    <div className="p-10">
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Post {...post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
