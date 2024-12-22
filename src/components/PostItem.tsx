import {
  Box,
  Divider,
  Link,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { Link as RouterLink } from "react-router";
import { useUpdatePostVoteMutation } from "../api/apiSlice";
import { Post, VoteValue } from "../api/models";
import { selectCurrentUserId } from "../auth/authSlice";
import { useAppSelector } from "../store";
import TagList from "./TagList";
import VoteButtons from "./VoteButtons";

// PostItem is displayed as an item within a PostList and links to the page for that post
export default function PostItem({ post }: { post: Post }) {
  const userId = useAppSelector(selectCurrentUserId);
  // Whether the current user is logged in
  const authenticated = !!userId;

  // Hooks to send voting requests
  const [updateVote] = useUpdatePostVoteMutation();

  const handleVote = (userVote: VoteValue, voteChange: number) => {
    // Unauthenticated users cannot vote
    if (!authenticated) {
      return;
    }
    updateVote({ postId: post.id, userId, userVote, voteChange });
  };

  return (
    <>
      <ListItem
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <ListItemText
          primary={
            <Link
              component={RouterLink}
              to={`/posts/${post.id}`}
              underline="hover"
            >
              {post.title}
            </Link>
          }
          secondary={formatDistanceToNow(post.createdAt, { addSuffix: true })}
        />
        <Box paddingY={1}>
          <TagList tags={post.topics} />
        </Box>

        <Typography color="textSecondary">{post.content}</Typography>
      </ListItem>
      <Box p={1}>
        <VoteButtons
          userVote={post.userVote}
          votes={post.votes}
          updateVote={handleVote}
          disabled={!authenticated}
        />
      </Box>
      <Divider variant="middle" component={"li"} />
    </>
  );
}
