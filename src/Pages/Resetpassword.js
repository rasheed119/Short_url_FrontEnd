import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Loading from "../Components/Loading";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { api } from "../config";
import { useNavigate } from "react-router-dom";

const login_validation_schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .test("com", "Invalid email", (value) => {
      if (value && !value.endsWith(".com")) {
        return false;
      }
      return true;
    })
    .required("Email is required"),
  newpassword: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be 8 characters long"),
  reenter_newpassword: yup
    .string()
    .oneOf([yup.ref("newpassword"), null], "Password must match")
    .required("Reenter Password is required"),
  token: yup
    .string()
    .min(10, "Token must be 10 Characters Long")
    .required("Token is Required"),
});

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function Resetpassword() {
  const navigate = useNavigate();
  const [show, setshow] = React.useState(true);
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        newpassword: "",
        reenter_newpassword: "",
        token: "",
      },
      validationSchema: login_validation_schema,
      onSubmit: async (user_data) => {
        try {
          setshow(false);
          const data = await axios.put(
            `${api}/users/reset_password`,
            user_data
          );
          alert(data.data.message);
          console.log(data.data.message);
          navigate("/");
        } catch (error) {
          setshow(true);
          alert(error.response.data.message);
        }
      },
    });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {touched.email && errors.email ? (
              <TextField
                error
                margin="normal"
                id="outlined-error"
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                helperText={errors.email}
              />
            ) : (
              <TextField
                margin="normal"
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            )}
            {touched.newpassword && errors.newpassword ? (
              <TextField
                error
                margin="normal"
                fullWidth
                name="newpassword"
                label="Password"
                onChange={handleChange}
                value={values.newpassword}
                onBlur={handleBlur}
                type="password"
                id="outlined-error"
                helperText={errors.newpassword}
              />
            ) : (
              <TextField
                margin="normal"
                fullWidth
                name="newpassword"
                label="Password"
                onChange={handleChange}
                value={values.newpassword}
                onBlur={handleBlur}
                type="password"
              />
            )}
            {touched.reenter_newpassword && errors.reenter_newpassword ? (
              <TextField
                error
                margin="normal"
                fullWidth
                name="reenter_newpassword"
                label="Re-Enter Password"
                onChange={handleChange}
                value={values.reenter_newpassword}
                onBlur={handleBlur}
                type="password"
                id="outlined-error"
                helperText={errors.reenter_newpassword}
              />
            ) : (
              <TextField
                margin="normal"
                fullWidth
                name="reenter_newpassword"
                label="Re-Enter Password"
                onChange={handleChange}
                value={values.reenter_newpassword}
                onBlur={handleBlur}
                type="password"
              />
            )}
            {touched.token && errors.token ? (
              <TextField
                error
                margin="normal"
                fullWidth
                name="token"
                label="Token"
                onChange={handleChange}
                value={values.token}
                onBlur={handleBlur}
                type="text"
                id="outlined-error"
                helperText={errors.token}
              />
            ) : (
              <TextField
                margin="normal"
                fullWidth
                name="token"
                label="Token"
                onChange={handleChange}
                value={values.token}
                onBlur={handleBlur}
                type="text"
              />
            )}
            {show ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset password
              </Button>
            ) : (
              <Loading />
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Resetpassword;
