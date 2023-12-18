"use client";

import {
  useEffect,
  useState,
} from 'react';

import { Comment } from './Comment';

export default function Comments({ post, isCommenting, setIsCommenting }) {
  const [comments, setComments] = useState([]);
  const [commentValue, SetCommentValue] = useState("");

  const [error, setError] = useState(null);

  const fetchComments = async (id) => {
    try {
      const res = await fetch(`/api/posts/${id}/comments`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Error fetching comments: ${res.statusText}`);
      }

      const info = await res.json();
      setComments(info.comments);
    } catch (error) {
      console.error("Error fetching comments:", error.message);
      setError("Error fetching comments");
    }
  };

  useEffect(() => {
    fetchComments(post.id);
  }, [post.id]);

  if (error) {
    return <p>{error}</p>;
  }
  const handleSaveComment = async () => {
    setIsCommenting(false);
    await fetch(`/api/posts/${post.id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: commentValue,
      }),
    });
    fetchComments(post.id);

    SetCommentValue("");
  };
  console.log(comments);
  return (
    <div className="edit-input">
      {isCommenting && (
        <div>
          <input
            type="text"
            value={commentValue}
            onChange={(e) => SetCommentValue(e.target.value)}
          />
          <div className="edit-btns">
            <button onClick={handleSaveComment}>Comment</button>
            <button onClick={() => setIsCommenting(false)}>Cancel</button>
          </div>
        </div>
      )}
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}