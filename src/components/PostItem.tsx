import { Link, ListItem, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { Post } from "../data/models";

// PostItem is displayed as an item within a PostList and links to the page for that post
export default function PostItem({ post }: { post: Post }) {
  return (
    <ListItem sx={{ width: "100%" }} alignItems="flex-start">
      <ListItemText
        primary={
          <Link component={RouterLink} to={`/posts/${post.id}`} underline="hover">
            {post.title}
          </Link>
        }
        secondary={post.content}
      />
    </ListItem>
  );
}
