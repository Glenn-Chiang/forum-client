import { Sell } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Post, VoteValue } from "../api/models";
import { selectCurrentUserId } from "../auth/authSlice";
import { useAppSelector } from "../store";
import EditTagsDialog from "./EditTagsDialog";
import PostActionMenu from "./PostActionMenu";
import TagList from "./TagList";
import VoteButtons from "./VoteButtons";
import {
  useDeletePostVoteMutation,
  useUpdatePostVoteMutation,
} from "../api/apiSlice";

export default function PostCard({ post }: { post: Post }) {
  const userId = useAppSelector(selectCurrentUserId);
  // Whether the current user is logged in
  const authenticated = !!userId
  // Whether the current user is the author of the post, which determines whether they can edit the post
  const authorized = userId === post.authorId;

  // Whether the user has upvoted, downvoted or not voted. This is only for optimistic UI updates, and does not actually involve sending any requests.
  const [userVote, setUserVote] = useState<VoteValue>(post.userVote);
  const [votes, setVotes] = useState(post.votes);
  console.log(userVote)
  // Hooks to send voting requests
  const [updateVote] = useUpdatePostVoteMutation();
  const [removeVote] = useDeletePostVoteMutation();

  const handleVote = (value: VoteValue) => {
    // Unauthenticated users cannot vote
    if (!authenticated) {
      return
    }

    setUserVote(value);

    if (value === 0) {
      removeVote({postId: post.id, userId})
    } else {
      updateVote({postId: post.id, userId, value})
    }
  };

  return (
    <Card sx={{ position: "relative" }}>
      {authorized && <PostActionMenu postId={post.id} />}
      <CardHeader
        title={post.title}
        subheader={
          post.author?.username +
          ", " +
          formatDistanceToNow(post.createdAt, { addSuffix: true })
        }
      />
      <Box
        paddingX={1}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"start"}
        gap={1}
      >
        <TagList tags={post.topics} />
        {authorized && (
          <EditTagsDialog
            post={post}
            triggerButton={<Button startIcon={<Sell />}>Edit tags</Button>}
          />
        )}
      </Box>
      <CardContent>
        <Typography>{post.content}</Typography>
      </CardContent>
      <CardActions>
        <VoteButtons
          userVote={userVote}
          vote={handleVote}
          votes={votes}
          setVotes={setVotes}
          disabled={!authenticated}
        />
      </CardActions>
    </Card>
  );
}
