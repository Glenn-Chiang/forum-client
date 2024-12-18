import {
  Divider,
  Link,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router";
import { Comment } from "../api/models";
import CommentActionMenu from "./CommentActionMenu";
import { useAppSelector } from "../store";
import { selectCurrentUserId } from "../auth/authSlice";
import { formatDistanceToNow } from "date-fns";

export default function CommentItem({ comment }: { comment: Comment }) {
  // Check if the current user is the comment author
  const userId = useAppSelector(selectCurrentUserId);
  const authorized = userId === comment.authorId;

  return (
    <>
      <ListItem
        sx={{
          width: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
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
          secondary={formatDistanceToNow(comment.createdAt, {
            addSuffix: true,
          })}
        />
        {authorized && <CommentActionMenu comment={comment} />}
        <Typography>{comment.content}</Typography>
      </ListItem>
      <Divider variant="middle" component={"li"} />
    </>
  );
}
