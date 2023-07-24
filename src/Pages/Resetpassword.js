import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
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
import { useLocation } from "react-router-dom";

const reset_password_validation_schema = yup.object().shape({
  email: yup.string(),
  newpassword: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be 8 characters long"),
  reenter_newpassword: yup
    .string()
    .oneOf([yup.ref("newpassword"), null], "Password must match")
    .required("Reenter Password is required"),
  token: yup.string(),
});

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function Resetpassword() {
  const location = useLocation();
  const searchparams = new URLSearchParams(location.search);
  const email = searchparams.get("email");
  const token = searchparams.get("token");
  console.log(email, token);
  const navigate = useNavigate();
  const [show, setshow] = React.useState(true);
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email,
        newpassword: "",
        reenter_newpassword: "",
        token,
      },
      validationSchema: reset_password_validation_schema,
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
          if (error.response.data.message === "jwt expired") {
            alert("The Link was expired");
          } else {
            alert(error.response.data.message);
          }
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
