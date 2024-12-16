import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Post } from "../api/models";
import { selectCurrentUserId } from "../auth/authSlice";
import { useAppSelector } from "../store";
import PostActionMenu from "./PostActionMenu";
import TagList from "./TagList";

export default function PostCard({ post }: { post: Post }) {
  // Check if the current user is the post author
  const userId = useAppSelector(selectCurrentUserId);
  const authorized = userId === post.authorId;
  
  return (
    <Card sx={{ position: "relative" }}>
      {authorized && <PostActionMenu postId={post.id} />}
      <CardHeader title={post.title} subheader={post.author?.username} />
      <TagList tags={post.topics} />
      <CardContent>
        <Typography>{post.content}</Typography>
      </CardContent>
    </Card>
  );
}
