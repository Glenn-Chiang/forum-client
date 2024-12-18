import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router";
import { useLoginMutation } from "../../api/apiSlice";
import { setCredentials } from "../../auth/authSlice";
import ErrorAlert from "../../components/feedback/ErrorAlert";
import { useToast } from "../../components/feedback/ToastProvider";
import { authFormSchema, AuthFormSchema } from "../../api/form_schemas";
import { useAppDispatch } from "../../store";
import { isApiError, parseApiError } from "../../api/errors";

export default function LoginPage() {
  // Redux mutation hook for login request
  const [login, { isLoading }] = useLoginMutation();
  // Redux action dispatcher
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuthFormSchema>({ resolver: zodResolver(authFormSchema) });

  // Keep track of error messages from server
  const [error, setError] = useState<string | null>(null);

  // Navigate hook
  const navigate = useNavigate();

  // Global toast hook
  const toast = useToast();

  const onSubmit: SubmitHandler<AuthFormSchema> = async (data) => {
    try {
      const authPayload = await login(data).unwrap();
      // Store the logged in user and token in redux state
      dispatch(setCredentials(authPayload));

      // On successful login, redirect to home and display toast
      navigate("/");
      toast.display("Signed in", "success");
    } catch (err) {
      // Display specififc error from API
      if (isApiError(err)) {
        setError(parseApiError(err));
      } else {
        setError("Error signing in");
      }
    }
  };

  return (
    <>
      <Typography component={"h1"} variant="h4">
        Sign In
      </Typography>
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        display={"flex"}
        flexDirection={"column"}
        width={"100%"}
        gap={2}
      >
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Controller
            name="username"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                id="username"
                {...field}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Controller
            name="password"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                id="password"
                type="password"
                {...field}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
        </FormControl>

        <Button type="submit" variant="contained" disabled={isLoading}>
          Sign in
        </Button>

        {error && <ErrorAlert message={error} />}

        <Divider />
        <Typography textAlign={"center"}>
          Don't have an account?{" "}
          <Link component={RouterLink} to={"/register"}>
            Sign up
          </Link>
        </Typography>
      </Box>
    </>
  );
}
