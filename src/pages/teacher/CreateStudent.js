import React from "react";
import { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Snackbar,
  IconButton,
} from "@mui/material";
import FileInput from "./components/FileInput";
import axios from "axios";
import { url } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import img from "../../assets/createstudent.svg";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

export default function CreateStudent() {
  let token = sessionStorage.getItem("token");
  const [errorMessage, setErrorMessage] = useState(""); //for alert
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    id: "",
    name: "",
    email: "",
    number: "",
  });
  const handleChanges = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    console.log(values);
  };
  const history = useNavigate();
  const handleToClose = (event, reason) => {
    if ("clickaway" === reason) return;
    setOpen(false);
    history("/allRecords");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    createLog();
  };
  async function createLog() {
    // Unit test 1
    // Student ID: number with 10 digits in the format 6000xx000xx
    // Name: string with letters and white space
    // Email: string in the format xxxxxx @domain_name.com
    // Phone Number: 10 digit number
    try {
      let result = await axios.post(
        url + "registerStudent",
        {
          id: values.id,
          name: values.name,
          number: values.number,
          email: values.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer" + " " + token,
          },
        }
      );
      console.log(result.data);
      console.log(result.data.acccess_token);
      if (result.data.message === "Student created successfully") {
        setErrorMessage("Student log created");
        setOpen(true);
      } else {
        setErrorMessage("Please fill all details");
      }
    } catch (error) {
      //Unit test 3
      // Student ID: number with 10 digits in the format 60004200011
      // Name: string with letters and white space
      // Email: string in the format xxxxxx @domain_name.com
      // Phone Number: 10 digit number
      console.log("Error" + error);
      if (error.response) {
        if (error.response.status == "401") {
          console.log(error.response.status);
          setErrorMessage("student already exists");
          setOpen(true);
        }
      }
    }
  }

  return (
    <>
      <div>
        <Grid
          container
          direction="row"
          justifyContent=""
          alignItems="flex"
        >
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="flex"
            style={{ gap: 15 }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{
                alignItems: "flex",
                justifyContent: "center",
                marginTop: "10px",
                //marginLeft: "36px",
                textAlign: "center",
              }}
            >
              <Typography style={{ fontWeight: "800", fontSize: "30px" }}>
                Add Students
              </Typography>
            </Grid>
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
            <img style={{ width: "400px", height: "400px" }} src={img} alt="" />
            {/* test Case 2
             Student ID: number with 10 digits in the format 6000xx000xx
            Name:
            Email: string in the format xxxxxx@domain_name.com
            Phone Number: */}

            <Box
              sx={{ mt: 3 }}
            >
              <FileInput />
              <ValidatorForm
                component="form"
                onSubmit={handleSubmit}
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="flex-start"
                  marginBottom={1}
                >
                  <div style={{ fontWeight: "700", fontSize: "23px" }}>
                    Add individual student record
                  </div>
                </Grid>
                <Grid
                  container
                  direction="column"
                  justifyContent="space-evenly"
                  alignItems="center"
                  marginBottom={1}
                >
                  <TextValidator
                    label="Student ID"
                    margin="normal"
                    type="number"
                    name="id"
                    value={values.id}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    style={{ boxColor: "black", width: "60vh" }}
                    onChange={handleChanges}
                  />
                  <TextValidator
                    label="Name"
                    name="name"
                    value={values.name}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    margin="normal"
                    style={{ boxColor: "black", width: "60vh" }}
                    onChange={handleChanges}
                    autoComplete="name"
                  />
                  <TextValidator
                    label="Email"
                    name="email"
                    value={values.email}
                    validators={["required", "isEmail"]}
                    errorMessages={[
                      "this field is required",
                      "email is not valid",
                    ]}
                    margin="normal"
                    style={{ boxColor: "black", width: "60vh" }}
                    onChange={handleChanges}
                    autoComplete="email"
                  />
                  <TextValidator
                    label="Phone Number"
                    name="number"
                    value={values.number}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    margin="normal"
                    type="number"
                    onChange={handleChanges}
                    style={{ boxColor: "black", width: "60vh" }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 5, ml: 2 }}
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    Create Record
                  </Button>
                </Grid>
              </ValidatorForm>
            </Box>

          </Grid>
        </Grid>
      </div>
    </>
  );
}
