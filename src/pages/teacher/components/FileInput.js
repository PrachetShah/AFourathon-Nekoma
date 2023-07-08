import React from "react";
import axios from "axios";
import { url } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Snackbar, IconButton, Button, Grid } from "@mui/material";
import { saveAs } from "file-saver";
import samplescsv from "../../../assets/template.xlsx";
import "./FileInput.css";

export default function FileInput() {
  const [errorMessage, setErrorMessage] = useState(""); //for alert
  const [open, setOpen] = useState(false);
  const history = useNavigate();
  let token = sessionStorage.getItem("token");
  const handleToClose = (event, reason) => {
    if ("clickaway" === reason) return;
    setOpen(false);
    history("/allRecords");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    uploadFile(formData);
  };
  async function uploadFile(formData) {
    try {
      let result = await axios.post(url + "registerBulk", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: "Bearer" + " " + token,
        },
      });
      console.log(result.data);
      console.log(token);
      if (result.data.message === "Students Registered Succesffuly") {
        setErrorMessage("bulk register done");
        setOpen(true);
      }
    } catch (error) {
      console.log("Error" + error);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status == "404") {
          console.log(error.response.status);
          setErrorMessage("file not recieved");
          setOpen(true);
        }
      }
    }
  }
  return (
    <div>
      <Grid container direction="row" justifyContent="center" alignItems="flex">
        <span style={{ fontWeight: "700", fontSize: "23px" }}>
          Add students via csv file{" "}
        </span>
        <Button
          variant="contained"
          style={{
            marginLeft: "5px",
            backgroundColor: "black",
            color: "white",
          }}
        >
          <label style={{ cursor: "pointer" }} htmlFor="input-img">
            Upload
          </label>
          <input type="file" id="input-img" onChange={handleSubmit} />
        </Button>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex"
        >
          <div style={{ fontWeight: "650", fontSize: "18px" }}>
            CSV file must follow this format{" "}
            <a href={samplescsv} stye={{ fontWeight: "650" }} target="_blank">
              <Button>Download CSV</Button>
            </a>
          </div>
        </Grid>
        <div
          style={{ textAlign: "center", fontWeight: "700", fontSize: "23px" }}
        >
          OR
        </div>
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
                >
                  <p>View</p>
                </IconButton>
              </React.Fragment>
            }
          />
        )}
      </Grid>
    </div>
  );
}
