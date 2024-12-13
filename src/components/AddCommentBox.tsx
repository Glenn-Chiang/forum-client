import { Box, Button, Stack, TextField } from "@mui/material";

export default function AddCommentBox() {
  return (
    <Box padding={1} display="flex" flexDirection="column" gap={1}>
      <TextField multiline fullWidth placeholder="Add a comment" maxRows={10} />
      <Stack direction={"row"} spacing={1}>
        <Button variant="contained">Comment</Button>
        <Button variant="outlined">Cancel</Button>
      </Stack>
    </Box>
  );
}
