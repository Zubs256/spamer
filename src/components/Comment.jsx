"use client";
export function Comment({ comment }) {
  return (
    <div className="comment">
      <p>{comment.text}</p>
    </div>
  );
}