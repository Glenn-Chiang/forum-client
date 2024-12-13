import PostCard from "../components/PostCard";
import { Post } from "../data/models";

export default function PostPage() {
  // TODO: Fetch post based on id param

  const post: Post = {
    id: 1,
    title: "God is dead",
    content:
      "God is dead. God remains dead. And we have killed him. How shall we comfort ourselves, the murderers of all murderers? What was holiest and mightiest of all that the world has ever owned has bled to death under our knives. Who will wipe this blood off us? What water is there to wash ourselves?",
    authorId: 1,
    author: {
      id: 1,
      username: "Friedrich Nietzsche"
    }
  };

  return (
    <>
      <PostCard post={post} />
    </>
  );
}
