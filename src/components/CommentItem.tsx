import { Link, ListItem, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { Comment } from "../data/models";
import CommentActionMenu from "./CommentActionMenu";

export default function CommentItem({ comment }: { comment: Comment }) {
  return (
    <ListItem
      sx={{ width: "100%", position: "relative" }}
      alignItems="flex-start"
    >
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
      <CommentActionMenu comment={comment} />
    </ListItem>
  );
}
