import { Grid, Button, Typography } from "@mui/material";
import "./Homepage.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

export default function HomePage() {
  let token = sessionStorage.getItem("token");
  let isToken = false;
  if (token) {
    isToken = true;
  }
  return (
    <>
      <Grid
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        direction="row"
      >
        <Grid item sm={6} md={3} className="left-box">
          <div className="text">
            <Grid item sm={6} md={3}>
              <Typography
                style={{
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  color: "#5E6282",
                }}
              >
                Welcome to
              </Typography>
              <Typography className="heading">Student Portal</Typography>
            </Grid>
            <br />
            <Grid item sm={6} md={12}>
              <Typography
                style={{
                  fontSize: "1.3rem",
                  paddingBottom: "20px",
                  color: "#5E6282",
                }}
              >
                In this student portal, you can access various features such as
                viewing your course materials, submitting assignments, checking
                grades, and more. Take full advantage of the resources available
                here and make the most out of your learning journey!
              </Typography>
            </Grid>
            <br />
            <Grid item sm={6} md={3}>
              {isToken ? (
                <Link to="/allrecords">
                  <Button className="loginButton" variant="contained">
                    Records&nbsp;
                    <ArrowForwardIcon />
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button className="loginButton" variant="contained">
                    Login&nbsp;
                    <ArrowForwardIcon />
                  </Button>
                </Link>
              )}
            </Grid>
          </div>
        </Grid>
        <Grid item sm={6} md={6} className="right-box"></Grid>
      </Grid>
    </>
  );
}