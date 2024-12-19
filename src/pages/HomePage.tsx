import { useState } from "react";
import { useGetPostsQuery } from "../api/apiSlice";
import ErrorAlert from "../components/feedback/ErrorAlert";
import LoadingSkeleton from "../components/LoadingSkeleton";
import PostList from "../components/PostList";
import PaginationBar from "../components/PaginationBar";

export default function Home() {
  const [page, setPage] = useState(1)
  const maxPostsPerPage = 10 // Max number of posts to display per page
  
  const {
    data: postList,
    isLoading,
    isSuccess,
  } = useGetPostsQuery({page});
  
  const posts = postList?.data || []
  const totalPosts = postList?.total_count || 0

  // Total number of pages required to display all posts
  const numPages = Math.ceil(totalPosts / maxPostsPerPage)

  return (
    <>
      {isLoading ? (
        <LoadingSkeleton/>
      ) : isSuccess ? (
        <PostList posts={posts} />
      ) : (
        <ErrorAlert/>
      )}
      <PaginationBar page={page} setPage={setPage} count={numPages}/>
    </>
  );
}
