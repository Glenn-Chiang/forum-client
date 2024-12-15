import { Box, Button, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCreatePostMutation } from "../api/apiSlice";
import { selectCurrentUserId } from "../auth/authSlice";
import InfoAlert from "../components/feedback/InfoAlert";
import { useAppSelector } from "../store";
import { zodResolver } from "@hookform/resolvers/zod";
import { postFormSchema, PostFormSchema } from "../form_schemas.ts/schemas";
import { useState } from "react";
import ErrorAlert from "../components/feedback/ErrorAlert";
import { useNavigate } from "react-router";
import { useToast } from "../components/feedback/ToastProvider";

export default function CreatePostPage() {
  // Get current userId
  const userId = useAppSelector(selectCurrentUserId);

  // Redux mutation hook
  const [createPost, { isLoading }] = useCreatePostMutation();

  // Form utils
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PostFormSchema>({resolver: zodResolver(postFormSchema)});

  // Server error state
  const [error, setError] = useState<string | null>(null)

  // Functions to redirect and display toast alert
  const navigate = useNavigate()
  const toast = useToast()

  // On submit, send the post data to the api
  const onSubmit: SubmitHandler<PostFormSchema> = async (data) => {
    try {
      const newPost = await createPost({
        ...data,
        authorId: userId!,
      }).unwrap();
      
      // Redirect to the newly-created post page
      navigate(`/posts/${newPost.id}`)
      
      // Display toast to alert the user that the post was successfully created
      toast.display('Post created!', 'success')

    } catch (err) {
      setError("Error creating post")
    }
  };

  if (!userId) {
    return <InfoAlert message="Login to create a post" />;
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
      <Typography variant="h6">Create a Post</Typography>
      {error && <ErrorAlert message={error}/>}
      <Controller
        name="title"
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
        sx={{ maxWidth: 100 }}
        variant="contained"
        disabled={isLoading}
      >
        Post
      </Button>
    </Box>
  );
}
