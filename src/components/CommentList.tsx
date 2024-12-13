import { Divider, List } from "@mui/material";
import { Comment } from "../data/models";
import CommentItem from "./CommentItem";

export default function CommentList({comments}: {comments: Comment[]}) {
  return (
    <List sx={{ width: "100%" }}>
      {comments.map((comment) => (
        <>
          <CommentItem key={comment.id} comment={comment} />
          <Divider variant="middle" component={"li"} />
        </>
      ))}
    </List>
  );
}


