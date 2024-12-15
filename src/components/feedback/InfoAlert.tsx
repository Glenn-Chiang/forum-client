import { Alert } from "@mui/material";

export default function InfoAlert({message}: {message: string}) {
  return <Alert severity="info">{message}</Alert>
}
