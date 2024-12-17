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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router";
import { authFormSchema, AuthFormSchema } from "../../form_schemas.ts/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../../components/feedback/ToastProvider";
import { useState } from "react";
import ErrorAlert from "../../components/feedback/ErrorAlert";

export default function RegisterPage() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AuthFormSchema>({ resolver: zodResolver(authFormSchema) });

  // Keep track of any error messages from server
  const [error, setError] = useState<string | null>(null);

  // Navigation hook
  const navigate = useNavigate();

  // Global toast hook
  const toast = useToast();

  const onSubmit: SubmitHandler<AuthFormSchema> = (data) => {
    try {
      
      // On successful registration, redirect to login and display toast
      // navigate("/login")
      // toast.display("Signed up!", 'success')
    } catch (err) {
      reset(); // Clear fields
      setError("Error signing up"); // TODO: Display more specific error message from server
    }
  };

  return (
    <>
      <Typography component={"h1"} variant="h4">
        Sign Up
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

        {error && <ErrorAlert message={error} />}

        <Button type="submit" variant="contained">
          Sign up
        </Button>
        <Divider />
        <Typography textAlign={"center"}>
          Already have an account?{" "}
          <Link component={RouterLink} to={"/login"}>
            Sign in
          </Link>
        </Typography>
      </Box>
    </>
  );
}
