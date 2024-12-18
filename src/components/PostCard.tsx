import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { Post } from "../api/models";
import { selectCurrentUserId } from "../auth/authSlice";
import { useAppSelector } from "../store";
import PostActionMenu from "./PostActionMenu";
import TagList from "./TagList";
import EditTagsDialog from "./EditTagsDialog";
import { Sell } from "@mui/icons-material";
import { formatDistanceToNow } from "date-fns";

export default function PostCard({ post }: { post: Post }) {
  // Check if the current user is the post author
  const userId = useAppSelector(selectCurrentUserId);
  const authorized = userId === post.authorId;

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
    </Card>
  );
}
