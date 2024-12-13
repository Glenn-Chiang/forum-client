import { ListItem, ListItemText } from "@mui/material";
import { Post } from "../data/models";

export default function PostItem({ post }: { post: Post }) {
  return (
    <ListItem sx={{width: '100%'}} alignItems="flex-start">
      <ListItemText primary={post.title} secondary={post.content}/>
      
    </ListItem>
  );
}
