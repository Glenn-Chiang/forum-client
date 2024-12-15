import { useParams } from "react-router";
import { useGetPostQuery } from "../api/apiSlice";
import AddCommentBox from "../components/AddCommentBox";
import CommentSection from "../components/CommentSection";
import ErrorAlert from "../components/feedback/ErrorAlert";
import LoadingSkeleton from "../components/LoadingSkeleton";
import PostCard from "../components/PostCard";

export default function PostPage() {
  const { id: postId } = useParams();

  const {
    data: post,
    isLoading,
    isSuccess,
    isError,
  } = useGetPostQuery(postId!);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <ErrorAlert />;
  }

  if (isSuccess) {
    return (
      <section>
        <PostCard post={post} />
        <AddCommentBox />
        <CommentSection />
      </section>
    );
  }
}
