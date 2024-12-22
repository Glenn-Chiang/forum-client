import {
  Box,
  Divider,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { Comment, VoteValue } from "../api/models";
import { selectCurrentUserId } from "../auth/authSlice";
import { useAppSelector } from "../store";
import CommentActionMenu from "./CommentActionMenu";
import VoteButtons from "./VoteButtons";
import { useUpdateCommentVoteMutation } from "../api/apiSlice";

export default function CommentItem({ comment }: { comment: Comment }) {
  const userId = useAppSelector(selectCurrentUserId);
  // Whether the current user is logged in
  const authenticated = !!userId;
  // Whether the current user is the author of the comment, which determines their edit permissions
  const authorized = userId === comment.authorId;

  // Hooks to send voting requests
  const [updateVote] = useUpdateCommentVoteMutation();

  const handleVote = (userVote: VoteValue, voteChange: number) => {
    // Unauthenticated users cannot vote
    if (!authenticated) {
      return;
    }
    updateVote({
      commentId: comment.id,
      postId: comment.postId,
      userId,
      userVote,
      voteChange,
    });
  };

  return (
    <>
      <ListItem
        sx={{
          width: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <ListItemText
          primary={
            <Typography color="primary">
              {comment.author ? comment.author.username : "[deleted]"}
            </Typography>
          }
          secondary={formatDistanceToNow(comment.createdAt, {
            addSuffix: true,
          })}
        />
        {authorized && <CommentActionMenu comment={comment} />}
        <Typography>{comment.content}</Typography>
      </ListItem>
      <Box p={1}>
        <VoteButtons
          userVote={comment.userVote}
          votes={comment.votes}
          updateVote={handleVote}
          disabled={!authenticated}
        />
      </Box>
      <Divider variant="middle" component={"li"} />
    </>
  );
}
