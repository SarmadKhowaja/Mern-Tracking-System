import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';

import backgroundImage from '../pic/app.jpeg'; // Import the image

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#007bff', // Customize primary color
      },
      secondary: {
        main: '#007bff', // Customize secondary color
      },
    },
    typography: {
      fontFamily: 'Arial', // Customize font family
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container>
      
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            marginTop:'30px',
            height:'400px'
          
          }}
        >
          {/* Add your content for the right side */}
        </Grid>
        <Grid item xs={12} md={6}>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Tracking System
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="User Name"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  size="small" // Reduced the size of the text field
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  size="small" // Reduced the size of the text field
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Button
                  fullWidth
                  variant="text"
                  onClick={handleSignUp}
                >
                  Sign Up
                </Button>
              </Box>
              {error && <div className="error">{error}</div>}
            </Box>
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

const theme = createTheme();

export default Login;
