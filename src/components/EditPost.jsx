"use client";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation.js";

import { API } from "@/lib/api";

// Define the EditPost component
export default function EditPost({ post, isEditing, setIsEditing }) {
  // State to manage edit mode and updated text

  const [updatedText, setUpdatedText] = useState(post.text);
  const router = useRouter();

  // Effect to update the input text when entering edit mode
  useEffect(() => {
    if (isEditing) {
      setUpdatedText(post.text);
    }
  }, [isEditing, post.text]);

  // Function to handle saving the edited post
  const handleSaveClick = async () => {
    setIsEditing(false);
    try {
      // Send a PUT request to update the post
      const response = await fetch(`${API}/api/posts/${post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: updatedText,
        }),
      });
      router.refresh();

      // Toggle back to view mode after a successful update
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="edit-container">
      {/* Display an input field for editing */}
      <input
        id="edit-input"
        type="text"
        value={updatedText}
        onChange={(e) => setUpdatedText(e.target.value)}
      />
      <div className="edit-btns">
        <button className="edit-btns" onClick={handleSaveClick}>
          Edit post
        </button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
    </div>
  );
}