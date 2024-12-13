import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'

export default function NavBar() {
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2}}>
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
            Forum
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
