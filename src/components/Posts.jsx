import { prisma } from "@/lib/prisma";

import Post from "./Post";

const Posts = async () => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return (
      <div id="posts-container">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error during fetch:", error);
    return null;
  }
};

export default Posts;