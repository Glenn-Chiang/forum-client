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
import {
  useUpdatePostVoteMutation
} from "../api/apiSlice";
import { Post } from "../api/models";
import { selectCurrentUserId } from "../auth/authSlice";
import { useAppSelector } from "../store";
import EditTagsDialog from "./EditTagsDialog";
import PostActionMenu from "./PostActionMenu";
import TagList from "./TagList";
import VoteButtons from "./VoteButtons";

export default function PostCard({ post }: { post: Post }) {
  const userId = useAppSelector(selectCurrentUserId);
  // Whether the current user is logged in
  const authenticated = !!userId
  // Whether the current user is the author of the post, which determines whether they can edit the post
  const authorized = userId === post.authorId;

  // Hooks to send voting requests
  const [updateVote] = useUpdatePostVoteMutation();

  const handleVote = (value: boolean) => {
    // Unauthenticated users cannot vote
    if (!authenticated) {
      return;
    }
    updateVote({ postId: post.id, userId, value: value ? 1 : -1 });
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
          userVote={post.userVote}
          votes={post.votes}
          updateVote={handleVote}
          disabled={!authenticated}
        />
      </CardActions>
    </Card>
  );
}
