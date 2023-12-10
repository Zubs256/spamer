import { API } from "@/lib/api";

import Post from "./Post";

export default async function Posts() {
  const res = await fetch(`${API}/api/posts`, { cache: "no-store" });
  const info = await res.json();
  console.log(info.posts);
  return (
    <div id="posts-container">
      {info.posts.map((post) => {
        return <Post post={post} />;
      })}
    </div>
  );
}