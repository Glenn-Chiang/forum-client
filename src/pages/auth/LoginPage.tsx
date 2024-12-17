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
import { Link as RouterLink } from "react-router";

export default function LoginPage() {
  return (
    <>
      <Typography
        component={"h1"}
        variant="h4"
        
      >
        Sign In
      </Typography>
      <Box
        component={"form"}
        display={"flex"}
        flexDirection={"column"}
        width={"100%"}
        gap={2}
      >
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <TextField id="username" />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField id="password" type="password" />
        </FormControl>
        <Button type="submit" variant="contained" >
          Sign in
        </Button>
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
