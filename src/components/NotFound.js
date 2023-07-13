import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import error from "../assets/error.png";

const NotFound = () => {
  let token = sessionStorage.getItem("token"); // Retrieve token from session storage
  let isToken = false; // Flag to check if token exists
  if (token) {
    isToken = true;
  }
  return (
    <div style={{ height: "86vh", paddingTop: "100px" }}>
      <center>
        <div style={{ transform: "translateY(-44px)" }}>
          <img width="390" src={error} alt="space"></img> {/* Error image */}
          <h1 style={{ fontWeight: 800 }}>Oops! Something went wrong!</h1> {/* Heading */}
          <br />
          <h2 style={{ color: "rgb(0,0,0,0.8)" }}>
            We couldn't find what you are looking for
          </h2> {/* Subheading */}
          <br />
          {isToken ? ( // Check if token exists
            <Link style={{ textDecoration: "none" }} to="/">
              <Button
                width="40px"
                variant="contained"
                style={{ backgroundColor: "black" }}
              >
                Try Again!
              </Button>
            </Link>
          ) : (
            <Link style={{ textDecoration: "none" }} to="/login">
              <Button
                width="40px"
                variant="contained"
                style={{ backgroundColor: "black" }}
              >
                Try Again!
              </Button>
            </Link>
          )}
        </div>
      </center>
    </div>
  );
};

export default NotFound;
