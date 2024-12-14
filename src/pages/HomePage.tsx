import { useGetPostsQuery } from "../api/apiSlice";
import { Post } from "../api/models";
import PostList from "../components/PostList";

// const posts: Post[] = [
//   { id: 1, title: "Post 1", content: "Hello world" },
//   { id: 2, title: "Post 2", content: "Hello world" },
//   { id: 3, title: "Post 3", content: "Hello world" },
// ];

export default function Home() {
  const {
    data: posts = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery();

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : isSuccess ? (
        <PostList posts={posts} />
      ) : (
        <div>Error</div>
      )}
    </>
  );
}
