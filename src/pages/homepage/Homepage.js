import { Grid, Button, Typography } from "@mui/material";
import "./Homepage.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

export default function HomePage() {
  let token = sessionStorage.getItem("token"); // Retrieve token from session storage
  let isToken = false; // Flag to check if token exists
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
        <Grid item sm={6} md={3} className="left-box"> {/* Left side container */}
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
              <Typography className="heading">Student Portal</Typography> {/* Heading */}
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
                adding individual student, adding many students through excel
                sheet, deleting and updating student information. Take full
                advantage of the resources available here and make the most out
                of it!
              </Typography> {/* Description */}
            </Grid>
            <br />
            <Grid item sm={6} md={3}>
              {isToken ? ( // Check if token exists
                <Link to="/allRecords"> {/* Link to all records page */}
                  <Button className="loginButton" variant="contained">
                    Records&nbsp;
                    <ArrowForwardIcon /> {/* Arrow icon */}
                  </Button>
                </Link>
              ) : (
                <Link to="/login"> {/* Link to login page */}
                  <Button className="loginButton" variant="contained">
                    Login&nbsp;
                    <ArrowForwardIcon /> {/* Arrow icon */}
                  </Button>
                </Link>
              )}
            </Grid>
          </div>
        </Grid>
        <Grid item sm={6} md={6} className="right-box"></Grid> {/* Right side container */}
      </Grid>
    </>
  );
}
