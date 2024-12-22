import { ThumbDown, ThumbUp } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { VoteValue } from "../api/models";

interface VoteButtonsProps {
  userVote: VoteValue; // Whether the current user has upvoted, downvoted or not voted
  votes: number; // Net number of votes displayed
  updateVote: (userVote: VoteValue, voteChange: number) => void
  disabled: boolean;
}

export default function VoteButtons({
  userVote,
  votes,
  updateVote,
  disabled,
}: VoteButtonsProps) {
  // Logic to toggle upvoted/downvoted/not voted states
  const handleClickVote = (voteVal: 1 | -1) => {
    if (userVote === 0) {
      updateVote(voteVal, voteVal)
    }

    if (userVote === voteVal) {
      updateVote(0, -voteVal)
    }

    if (userVote === -voteVal) {
      updateVote(voteVal, 2 * voteVal)
    }
  }

  const handleClickUpvote = () => handleClickVote(1)
  const handleClickDownvote = () => handleClickVote(-1)

  return (
    <Box display={"flex"} alignItems={"center"}>
      <IconButton
        onClick={handleClickUpvote}
        disabled={disabled}
        color={userVote === 1 ? "primary" : "default"}
      >
        <ThumbUp />
      </IconButton>
      <Typography
        color={userVote === 0 ? "textSecondary" : "primary"}
        variant="body2"
      >
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
