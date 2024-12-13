import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Post } from "../data/models";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Card>
      <CardHeader title={post.title} subheader={post.author.username}/>
      <CardContent>
        <Typography>{post.content}</Typography>
      </CardContent>
    </Card>
  );
}
