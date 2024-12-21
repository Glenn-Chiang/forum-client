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
import { Post, VoteValue } from "../api/models";
import TagList from "./TagList";
import { useAppSelector } from "../store";
import { selectCurrentUserId } from "../auth/authSlice";
import { useState } from "react";
import {
  useDeletePostVoteMutation,
  useUpdatePostVoteMutation,
} from "../api/apiSlice";
import VoteButtons from "./VoteButtons";

// PostItem is displayed as an item within a PostList and links to the page for that post
export default function PostItem({ post }: { post: Post }) {
  const userId = useAppSelector(selectCurrentUserId);
  // Whether the current user is logged in
  const authenticated = !!userId;

  // Whether the user has upvoted, downvoted or not voted. This is only for optimistic UI updates, and does not actually involve sending any requests.
  const [userVote, setUserVote] = useState<VoteValue>(post.userVote);
  const [votes, setVotes] = useState(post.votes);

  // Hooks to send voting requests
  const [updateVote] = useUpdatePostVoteMutation();
  const [removeVote] = useDeletePostVoteMutation();

  const handleVote = (value: VoteValue) => {
    // Unauthenticated users cannot vote
    if (!authenticated) {
      return;
    }

    setUserVote(value);

    if (value === 0) {
      removeVote({ postId: post.id, userId });
    } else {
      updateVote({ postId: post.id, userId, value });
    }
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
      <Box p={1} sx={{}}>
        <VoteButtons
          userVote={userVote}
          vote={handleVote}
          votes={votes}
          setVotes={setVotes}
          disabled={!authenticated}
        />
      </Box>
      <Divider variant="middle" component={"li"} />
    </>
  );
}
