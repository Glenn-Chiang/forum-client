import { useParams } from "react-router";
import { useGetPostQuery } from "../api/apiSlice";
import AddCommentBox from "../components/AddCommentBox";
import BackButton from "../components/BackButton";
import CommentSection from "../components/CommentSection";
import ErrorAlert from "../components/feedback/ErrorAlert";
import LoadingSkeleton from "../components/LoadingSkeleton";
import PostCard from "../components/PostCard";
import { useAppSelector } from "../store";
import { selectCurrentUserId } from "../auth/authSlice";

export default function PostPage() {
  const { id: postId } = useParams();

  const {
    data: post,
    isLoading,
    isSuccess,
    isError,
  } = useGetPostQuery(postId!);

  const userId = useAppSelector(selectCurrentUserId);
  const authenticated = !!userId;

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <ErrorAlert />;
  }

  if (isSuccess) {
    return (
      <section>
        <BackButton />
        <PostCard post={post} />
        {authenticated && <AddCommentBox postId={Number(postId)} />}
        <CommentSection />
      </section>
    );
  }
}
