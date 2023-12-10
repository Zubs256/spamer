"use client";
import { useRouter } from "next/navigation.js";

import { API } from "@/lib/api";



export default function DeletePost({ post }) {
  const router = useRouter();
  async function handleDeleteButton() {
    const response = await fetch(`${API}/api/posts/${post.id}`, {
      method: "DELETE",
    });
    // const info = await response.json();

    //setPostText("");
    router.refresh();
  }
  return (
    <div>
      <button className="btns" onClick={handleDeleteButton}>
      🗑️
      </button>
    </div>
  );
}