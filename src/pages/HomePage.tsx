import { useGetPostsQuery } from "../api/apiSlice";
import ErrorAlert from "../components/ErrorAlert";
import LoadingSkeleton from "../components/LoadingSkeleton";
import PostList from "../components/PostList";

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
        <LoadingSkeleton/>
      ) : isSuccess ? (
        <PostList posts={posts} />
      ) : (
        <ErrorAlert/>
      )}
    </>
  );
}
