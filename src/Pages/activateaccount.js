import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { api } from "../config";
import { useParams, Link } from "react-router-dom";

const defaultTheme = createTheme();

function Activateaccount() {
  const { email } = useParams();
  const [response, Setresponse] = useState("");

  useEffect(() => {
    const getdata = async () => {
      const data = await axios.put(`${api}/users/activate_account`, { email });
      //Setresponse(data.data.message);
      Setresponse(data.data.message);
    };
    getdata();
  }, []);

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
            Account Activation
          </Typography>
          <Box
            sx={{
              mt: 1,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              src="https://cdn.pixabay.com/photo/2017/01/13/01/22/ok-1976099_1280.png"
              width="100"
              height="100"
              alt="Success"
            />
            <Typography>{response}</Typography>
            <Typography sx={{ mt: 1 }}>
              <Link to="/">Back to Login page</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Activateaccount;
