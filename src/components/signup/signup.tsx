import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  Link,
} from "@mui/material";
import { BackendServices } from "../../services/Backend.services";


const Signup = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackBarMsg, setSnackbarMsg] = useState("");
  const [snackBarType, setSnackbarType] = useState("success");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = { username: "", password: "" };
    let isValid = true;

    if (!formData.username.trim()) {
      tempErrors.username = "Username is required";
      isValid = false;
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    } /* else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
      isValid = false;
    } */

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validate()) {
      BackendServices.userSignUp(formData.username, formData.password).then(
        (res) => {
          console.log("Signup Successful", res);
          setSnackbarMsg("SignedUp Successfully !!!")
          setSnackbarType("success")
          setOpenSnackbar(true);
          setFormData({ username: "", password: "" });
        },
        (err) => {
          console.log("Signup Error", err);
          const errMsg = err.status === 409 ? "Username Already Exists! Please use a different username" : "Something went wrong!"
          setSnackbarMsg(errMsg)
          setSnackbarType("error")
          setOpenSnackbar(true);
        }
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={Boolean(errors.username)}
            helperText={errors.username}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already Signed Up? <Link href="/login">Login</Link> to check your AnoTexts
        </Typography>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackBarType == 'success' ? "success" : "error"} sx={{ width: "100%" }}>
          {snackBarMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Signup;
