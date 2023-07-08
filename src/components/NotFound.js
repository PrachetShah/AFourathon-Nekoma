import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import error from "../assets/error.png";

const NotFound = () => {
  return (
    <div style={{ height: "86vh", paddingTop: "100px" }}>
      <center>
        <div style={{ transform: "translateY(-44px)" }}>
          <img width="390" src={error} alt="space"></img>
          <h1 style={{ fontWeight: 800 }}>Oops! Something went wrong!</h1>
          <br />
          <h2 style={{ color: "rgb(0,0,0,0.8)" }}>
            We couldn't find what you are looking for
          </h2>
          <br />
          <Link style={{ textDecoration: "none" }} to="/login">
            <Button
              width="40px"
              variant="contained"
              style={{ backgroundColor: "black" }}
            >
              Try Again!
            </Button>
          </Link>
        </div>
      </center>
    </div>
  );
};

export default NotFound;
