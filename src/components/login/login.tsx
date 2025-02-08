import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
  Grid,
  Link,
} from "@mui/material";
import { BackendServices } from "../../services/Backend.services";
import { useNavigate } from "react-router-dom";



const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event: any) => {
    event.preventDefault();

    const loginData = { username, password };

    BackendServices.userLogin(username, password)
      .then((response) => {
        if (response.status == 200) {
          return response.data;
        } else {
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        console.log("Login successful", data);
        localStorage.setItem('authToken', `${data.accessToken}`)
        navigate('/dashboard')
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        lg={4}
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: 2,
          boxShadow: 3,
          padding: 4,
        }}
      >
        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              Login
            </Typography>
            <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  fontSize: "1rem",
                }}
              >
                Login
              </Button>
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Don't have a Account yet ? <Link href="/">Sign Up</Link> now to get your AnoTexts
            </Typography>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
