import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Divider, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCreateCommentMutation } from "../api/apiSlice";
import { CommentFormSchema, commentFormSchema } from "../api/form_schemas";
import ErrorAlert from "./feedback/ErrorAlert";
import { useToast } from "./feedback/ToastProvider";

export default function AddCommentBox({ postId }: { postId: number }) {
  // Redux mutation function
  const [createComment, { isLoading }] = useCreateCommentMutation();

  // Form utils
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CommentFormSchema>({ resolver: zodResolver(commentFormSchema) });

  // Server error state
  const [error, setError] = useState<string | null>(null);

  // Global toast hook
  const toast = useToast();

  // On submit, send comment data to the api
  const onSubmit: SubmitHandler<CommentFormSchema> = async (data) => {
    try {
      await createComment({ ...data, postId }).unwrap();
      // Clear the text field
      reset();

      // Display toast to alert the user that the comment was successfully posted
      toast.display("Comment posted!", "success");
    } catch (err) {
      setError("Error posting comment");
    }
  };

  // Clear text field when cancel button is clicked
  const handleCancel = () => {
    reset();
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      padding={1}
      display="flex"
      flexDirection="column"
      gap={1}
    >
      <Controller
        name="content"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            multiline
            fullWidth
            placeholder="Add a comment"
            maxRows={10}
            {...field}
            error={!!errors.content}
            helperText={errors.content?.message}
          />
        )}
      />
      {error && <ErrorAlert message={error} />}
      <Stack direction={"row"} spacing={1}>
        <Button type="submit" disabled={isLoading} variant="text">
          Comment
        </Button>
        <Button onClick={handleCancel} variant="text" disabled={isLoading}>
          Cancel
        </Button>
      </Stack>
      <Divider />
    </Box>
  );
}
