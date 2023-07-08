import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { url } from "../utils/api";
import { Link } from "react-router-dom";
import { Snackbar, IconButton } from "@mui/material";
import signup from "../assets/signup.svg";

const theme = createTheme();

export default function TeacherRegister() {
  const [errorMessage, setErrorMessage] = useState(""); //for alert
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    password: "",
    email: "",
  });

  const handleChanges = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    console.log(values);
  };
  const handleToClose = (event, reason) => {
    if ("clickaway" === reason) return;
    setOpen(false);
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password has to be minimum 6 characters"),
  });

  const history = useNavigate();

  const handleSubmit = async (formikSubmit) => {
    try {
      let result = await axios.post(
        url + "register",
        {
          password: formikSubmit.password,
          email: formikSubmit.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log(result.data);
      if (result.data.message === "Admin created successfully") {
        setErrorMessage("Registration successful");
        setOpen(true);
        sessionStorage.setItem("token", result.data.token);
        history("/login")
      }
    } catch (error) {
      console.log("Error" + error);
      if (error.response) {
        if (error.response.status == "401") {
          console.log(error.response.status);
          setErrorMessage("Email already registered");
          setOpen(true);
        }
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: `url(${signup})`,
            backgroundRepeat: "no-repeat",
            backgroundSize:"90%",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 15,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "black" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form noValidate sx={{ mt: 5 }}>
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  style={{ color: "red" }}
                />
                <br />
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  sx={{ mt: 3 }}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  style={{ color: "red" }}
                />
                <br />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 3 }}
                  style={{ backgroundColor: "black", color: "white" }}
                  onClick={handleSubmit}
                >
                  Sign up
                </Button>
                {errorMessage && (
                  <Snackbar
                    open={open}
                    message={errorMessage}
                    onClose={handleToClose}
                    action={
                      <React.Fragment>
                        <IconButton
                          size="small"
                          aria-label="close"
                          color="inherit"
                          onClick={handleToClose}
                        ></IconButton>
                      </React.Fragment>
                    }
                  />
                )}
                <Link to="/login" style={{ color: "black" }}>
                  Already have an account? Login
                </Link>
              </Form>
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
