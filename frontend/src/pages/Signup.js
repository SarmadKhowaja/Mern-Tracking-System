import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
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

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { signup, error, isLoading } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, name , password);
  };

  const handleSignIn = () => {
    navigate('/login');
  };


  const [showUsernamedHint, setShowUsernamedHint] = useState(false);
  const handleUsernameFocus = () => {
    setShowUsernamedHint(true);
  };

  const handleUsernameBlur = () => {
    setShowUsernamedHint(false);
  };

  const [showPasswordHint, setShowPasswordHint] = useState(false);
  const handlePasswordFocus = () => {
    setShowPasswordHint(true);
  };

  const handlePasswordBlur = () => {
    setShowPasswordHint(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            Sign up
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
              size="small"
              onFocus={handleUsernameFocus}
              onBlur={handleUsernameBlur}
            />
            {showUsernamedHint && (
             <p style={{ fontSize: '12px', color: 'gray' }}>
               Username should be like john.snow
             </p>
             )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              size="small"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              size="small"
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
            />
            {showPasswordHint && (
             <p style={{ fontSize: '12px', color: 'gray' }}>
               Password should include at least 1 uppercase letter, 1 lowercase letter, 1 special character, and have a minimum length of 5 characters.
             </p>
             )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Sign Up
            </Button>
          </Box>
          {error && <div className="error">{error}</div>}
          <Link href="/login" variant="body2">
            Already have an account? Sign In
          </Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

const theme = createTheme();

export default Signup;
