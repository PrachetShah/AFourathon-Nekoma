import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from "axios";
import { url } from "../utils/api";
import { Link } from "react-router-dom";
import login from "../assets/login.svg";
import { Snackbar, IconButton } from "@mui/material";

const theme = createTheme();
export default function TeacherLogin() {
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

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleToClose = (event, reason) => {
    if ("clickaway" === reason) return;
    setOpen(false);

  };
  const history = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    createacc();
  };

  async function createacc() {
    try {
      let result = await axios.post(
        url + "login",
        {
          password: values.password,
          email: values.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log(result.data.access_token);
      //console.log(result.response.status)
      if (result.data.access_token) {
        setErrorMessage('Logged in');
        setOpen(true);
        sessionStorage.setItem("token", result.data.access_token);
        history("/");
      }
      else {
        alert('Please fill all details correctly')
        setErrorMessage('Please fill all details correctly');
        setOpen(true);
      }
    } catch (error) {
      console.log("Error" + error);

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status == "401") {
          console.log(error.response.status)
          setErrorMessage('wrong credentials');
          setOpen(true);
        }
        else if(error.response.status == "404")
        {
          console.log(error.response.status)
          setErrorMessage('user does not exist');
          setOpen(true);
        }
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh'}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: `url(${login})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            // backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 15,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'black' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 5 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChanges}
                autoComplete="email"
                autoFocus
              />
              <br/>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={values.password.trim()}
                onChange={handleChange("password")}
                autoComplete="current-password"
                sx={{ mt: 3 }}
              />
              <br/>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 5, mb: 3 }}
                style={{ backgroundColor: "black", color: "white" }}
              >
                Login
              </Button>
              {errorMessage && <Snackbar open={open} message={errorMessage} onClose={handleToClose} action={
                <React.Fragment>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleToClose}
                  >
                  </IconButton>
                </React.Fragment>
              } />}
              <Link to="/register" style={{ color: "black" }}>Don't have an account? Sign Up</Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
