import { useGetPostsQuery } from "../api/apiSlice";
import ErrorAlert from "../components/alerts/ErrorAlert";
import LoadingSkeleton from "../components/LoadingSkeleton";
import PostList from "../components/PostList";

export default function Home() {
  const {
    data: posts = [],
    isLoading,
    isSuccess,
  } = useGetPostsQuery();

  return (
    <>
      {isLoading ? (
        <LoadingSkeleton/>
      ) : isSuccess ? (
        <PostList posts={posts} />
      ) : (
        <ErrorAlert/>
      )}
    </>
  );
}
