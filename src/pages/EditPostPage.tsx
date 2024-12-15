import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useGetPostQuery, useUpdatePostMutation } from "../api/apiSlice";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorAlert from "../components/feedback/ErrorAlert";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { postFormSchema, PostFormSchema } from "../form_schemas.ts/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useToast } from "../components/feedback/ToastProvider";

export default function EditPostPage() {
  // Fetch the post that we want to edit
  const { id: postId } = useParams();
  const { data: post, isLoading, isSuccess } = useGetPostQuery(postId!);

  // Redux mutation function
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  // Form utils
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PostFormSchema>({ resolver: zodResolver(postFormSchema) });

  // Server error state
  const [error, setError] = useState<string | null>(null);

  // Functions to redirect and display toast alert
  const navigate = useNavigate();
  const toast = useToast();

  // On submit, send the post update data to the api
  const onSubmit: SubmitHandler<PostFormSchema> = async (data) => {
    try {
      await updatePost({
        ...data,
        id: Number(postId),
      }).unwrap();

      // Redirect to post page
      navigate(`/posts/${postId}`);

      // Display toast to alert the user that the post was successfully updated
      toast.display("Post updated!", "success");
    } catch (err) {
      setError("Error updating post");
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!isSuccess) {
    return <ErrorAlert />;
  }

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      padding={1}
      display="flex"
      flexDirection="column"
      gap={1}
    >
      <Typography variant="h6">Edit Post</Typography>
      {error && <ErrorAlert message={error} />}
      <Controller
        name="title"
        defaultValue={post.title}
        control={control}
        render={({ field }) => (
          <TextField
            fullWidth
            placeholder="Title"
            {...field}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        )}
      />
      <Controller
        name="content"
        defaultValue={post.content}
        control={control}
        render={({ field }) => (
          <TextField
            fullWidth
            placeholder="Content"
            multiline
            minRows={5}
            maxRows={10}
            {...field}
            error={!!errors.content}
            helperText={errors.content?.message}
          />
        )}
      />
      <Button
        type="submit"
        disabled={isUpdating}
        sx={{ maxWidth: 100 }}
        variant="contained"
      >
        Save
      </Button>
    </Box>
  );
}
