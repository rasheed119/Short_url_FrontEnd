import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import { api } from "../config";
import { useCookies } from "react-cookie";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [data, Setdata] = useState();
  const [cookies] = useCookies(["access_token"]);
  const token = cookies.access_token;
  const userid = window.localStorage.getItem("userID");
  useEffect(() => {
    const getdata = async () => {
      const response = await axios.get(`${api}/dashboard/${userid}`, {
        headers: {
          token,
        },
      });
      Setdata(response.data);
    };
    getdata();
  }, []);
  return (
    <>
      <Navbar />
      <Container>
        <Box
          sx={{
            borderRadius: 5,
            m: 10,
            padding: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CssBaseline />
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography variant="h5" component="h1">
              Dashboard
            </Typography>
          </Box>
          <Box sx={{ minWidth: 275, m: 3, textAlign: "center" }}>
            <Card variant="outlined">
              <React.Fragment>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Short Urls Stats
                  </Typography>
                  {data ? (
                    <>
                      <Typography
                        sx={{ mt: 2, mb: 2 }}
                        variant="h5"
                        component="div"
                      >
                        Total Urls : {data.totalurls}
                      </Typography>
                      <Typography
                        sx={{ mt: 2, mb: 2 }}
                        variant="h5"
                        component="div"
                      >
                        Total Clicks : {data.totalClicks}
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="h5" component="div">
                      Loading...
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => navigate("/createurl")}>
                    Create Shorturl
                  </Button>
                </CardActions>
              </React.Fragment>
            </Card>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Dashboard;
