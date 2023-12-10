import { Toaster } from "react-hot-toast";

import NewPost from "@/components/NewPost";
import Posts from "@/components/Posts";

export default function Home() {
  return (
    <main>
      <Toaster position="top-center" />
      <h1>Spammer</h1>
      <NewPost />
      <Posts />
    </main>
  );
}