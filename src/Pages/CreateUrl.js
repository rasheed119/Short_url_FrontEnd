import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Button, Container, Typography } from "@mui/material";
import { useCookies } from "react-cookie";
import axios from "axios";
import { api } from "../config";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import * as yup from "yup";
import { useFormik } from "formik";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const url_validation_schema = yup.object({
  long_url: yup.string().required("Long Url is Required"),
});

function CreateUrl() {
  const [cookies] = useCookies(["access_token"]);
  const [url, seturl] = useState("");
  const userID = window.localStorage.getItem("userID");
  const token = cookies.access_token;
  const getdata = async () => {
    const response = await axios.get(`${api}/user/${userID}`, {
      headers: {
        token,
      },
    });
    seturl(response.data.data);
  };
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        long_url: "",
      },
      validationSchema: url_validation_schema,
      onSubmit: async (url_data) => {
        try {
          const response = await axios.post(
            `${api}/shorten`,
            {
              longurl: url_data.long_url,
              userid: userID,
            },
            {
              headers: {
                token,
              },
            }
          );
          alert(response.data.message);
          values.long_url = "";
          getdata();
        } catch (error) {
          console.log(error.message);
        }
      },
    });
  const [expanded, setExpanded] = React.useState([]);

  // Function to handle the expansion/collapse of a card at a specific index
  const handleExpandClick = (index) => {
    setExpanded((prevExpanded) => {
      const updatedExpanded = [...prevExpanded];
      updatedExpanded[index] = !updatedExpanded[index];
      return updatedExpanded;
    });
  };
  useEffect(() => {
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
            <Typography variant="h3" component="h1" fontFamily="monospace">
              Welcome to ShortUrl
            </Typography>
          </Box>

          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">
              Enter Long url
            </InputLabel>
            <Input
              id="standard-adornment-amount"
              startAdornment={
                <InputAdornment position="start">https</InputAdornment>
              }
              name="long_url"
              value={values.long_url}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.long_url && errors.long_url ? (
              <Typography style={{ color: "crimson" }}>
                {errors.long_url}
              </Typography>
            ) : (
              ""
            )}
          </FormControl>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
          <React.Fragment>
            <CssBaseline />
            <Container fixed>
              <Typography
                sx={{ mt: 2, mb: 2 }}
                variant="h5"
                fontFamily="cursive"
                component="div"
              >
                Created Url will display below :
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 1, sm: 4, md: 12 }}
                >
                  {url && url.length === 0 ? (
                    <Stack spacing={1} sx={{ mt: 5 }}>
                      <Skeleton variant="rectangular" width={210} height={60} />
                      <Skeleton variant="rounded" width={210} height={60} />
                    </Stack>
                  ) : (
                    url &&
                    url.map((obj, index) => (
                      <Grid item xs={2} sm={4} md={4} key={index}>
                        <Card
                          sx={{
                            maxWidth: 345,
                            ":hover": { boxShadow: 20 },
                            mt: 5,
                            borderRadius : "10"
                          }}
                        >
                          <Typography
                            paragraph
                            fontFamily="cursive"
                            sx={{ mx: 1, textAlign: "center",mt:1 }}
                          >
                            Click Count : {obj.count}
                          </Typography>
                          <CardContent>
                            <Typography
                              variant="body2"
                              fontFamily="cursive"
                              color="text.secondary"
                            >
                              <a
                                href={obj.shorturl}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {obj.shorturl}
                              </a>
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <ExpandMore
                              expand={expanded[index]}
                              onClick={() => handleExpandClick(index)}
                              aria-expanded={expanded[index]}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse
                            in={expanded[index]}
                            timeout="auto"
                            unmountOnExit
                            sx={{ maxHeight: "50vh", overflowY: "auto" }}
                          >
                            <CardContent>
                              <Typography fontFamily="cursive" paragraph>
                                Long Url :{" "}
                              </Typography>
                              <Typography
                                paragraph
                                fontFamily="cursive"
                                style={{ overflowWrap: "break-word" }}
                              >
                                <a
                                  href={obj.longurl}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {obj.longurl}
                                </a>
                              </Typography>
                            </CardContent>
                          </Collapse>
                        </Card>
                      </Grid>
                    ))
                  )}
                </Grid>
              </Box>
            </Container>
          </React.Fragment>
        </Box>
      </Container>
    </>
  );
}

export default CreateUrl;
