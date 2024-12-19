import {
  Divider,
  Link,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { Link as RouterLink } from "react-router";
import { Post } from "../api/models";

// PostItem is displayed as an item within a PostList and links to the page for that post
export default function PostItem({ post }: { post: Post }) {
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
        <Typography color="textSecondary">{post.content}</Typography>
      </ListItem>
      <Divider variant="middle" component={"li"} />
    </>
  );
}
