import { Link, ListItem, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { Comment } from "../data/models";

export default function CommentItem({ comment }: { comment: Comment }) {
  return (
    <ListItem sx={{ width: "100%" }} alignItems="flex-start">
      <ListItemText
        primary={
          <Link
            component={RouterLink}
            to={`/profiles/${comment.authorId}`}
            underline="hover"
          >
            {comment.author.username}
          </Link>
        }
        secondary={comment.content}
      />
    </ListItem>
  );
}
