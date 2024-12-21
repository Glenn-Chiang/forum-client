import { ThumbDown, ThumbUp } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { VoteValue } from "../api/models";

interface VoteButtonsProps {
  // These state values and setters only perform optimistic updates to the UI
  userVote: VoteValue; // Whether the current user has upvoted, downvoted or not voted
  votes: number; // Net number of votes displayed
  setVotes: (votes: number) => void; // Set net number of votes displayed

  // This function should actually execute the voting action, not just update the UI
  vote: (value: VoteValue) => void;
  disabled: boolean
}

export default function VoteButtons({
  userVote,
  votes,
  setVotes,
  vote,
  disabled
}: VoteButtonsProps) {
  const handleClickUpvote = () => {
    switch (userVote) {
      // If currently unvoted, set to upvoted and increment votes by 1
      case 0:
        vote(1);
        setVotes(votes + 1);
        break;
      // If currently upvoted, set to unvoted and decrement votes by 1
      case 1:
        vote(0);
        setVotes(votes - 1);
        break;
      // If currently downvoted, set to upvoted and increment votes by 2
      case -1:
        vote(1);
        setVotes(votes + 2);
    }
  };

  const handleClickDownvote = () => {
    switch (userVote) {
      // If currently unvoted, set to downvoted and decrement votes by 1
      case 0:
        vote(-1);
        setVotes(votes - 1);
        break;
      // If curently upvoted, set to downvoted and decrement votes by 2
      case 1:
        vote(-1);
        setVotes(votes - 2);
        break;
      // if currently downvoted, set to unvoted and increment votes by 1
      case -1:
        vote(0);
        setVotes(votes + 1);
    }
  };

  return (
    <Box display={"flex"} alignItems={"center"}>
      <IconButton
        onClick={handleClickUpvote}
        disabled={disabled}
        color={userVote === 1 ? "primary" : "default"}
      >
        <ThumbUp />
      </IconButton>
      <Typography color={userVote === 0 ? "textSecondary" : "primary"} variant="body2">
        {votes}
      </Typography>
      <IconButton
        onClick={handleClickDownvote}
        disabled={disabled}
        color={userVote === -1 ? "primary" : "default"}
      >
        <ThumbDown />
      </IconButton>
    </Box>
  );
}
