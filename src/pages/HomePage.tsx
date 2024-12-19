import { useState } from "react";
import { useGetPostsQuery } from "../api/apiSlice";
import ErrorAlert from "../components/feedback/ErrorAlert";
import LoadingSkeleton from "../components/LoadingSkeleton";
import PostList from "../components/PostList";

export default function Home() {
  const [page, setPage] = useState(1)

  const {
    data: posts = [],
    isLoading,
    isSuccess,
  } = useGetPostsQuery({page});

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
