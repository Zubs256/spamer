"use client";
import { useRouter } from "next/navigation.js";

import { API } from "@/lib/api";

export default function LikePost({ post }) {
  const router = useRouter();

  async function addLike() {
    const response = await fetch(`${API}/api/posts/${post.id}/likes`, {
      method: "POST",
      cache: "no-store",
    });
    const info = await response.json();
    // for my likes to show
    router.refresh();

    console.log(info);
  }

  return (
    <div>
      <button className="btns" onClick={addLike}>
        {post.likes}👍
      </button>
    </div>
  );
}