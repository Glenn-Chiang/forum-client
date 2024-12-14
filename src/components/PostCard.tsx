import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Post } from "../data/models";
import PostActionMenu from "./PostActionMenu";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Card sx={{ position: "relative" }}>
      <CardHeader title={post.title} subheader={post.author?.username} />
      <PostActionMenu postId={post.id}/>
      <CardContent>
        <Typography>{post.content}</Typography>
      </CardContent>
    </Card>
  );
}
