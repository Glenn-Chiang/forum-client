import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Post } from "../api/models";
import PostActionMenu from "./PostActionMenu";
import TagList from "./TagList";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Card sx={{ position: "relative" }} >
      <PostActionMenu postId={post.id}/>
      <CardHeader title={post.title} subheader={post.author?.username} />
      <TagList tags={post.topics}/>
      <CardContent>
        <Typography>{post.content}</Typography>
      </CardContent>
    </Card>
  );
}
