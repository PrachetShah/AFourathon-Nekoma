import React from "react";
import Delete from "./components/Delete";
import { useState } from "react";
import { Grid, Typography, TextField, Button, Box, Snackbar, IconButton } from "@mui/material";
import FileInput from "./components/FileInput";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { url } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function CreateStudent() {

    const [errorMessage, setErrorMessage] = useState(""); //for alert
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        id: "",
        name: "",
        email: "",
        number: ""
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
        history("/allRecords")
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            id: data.get("id"),
            name: data.get("name"),
            email: data.get("email"),
            number: data.get("number")
        });
        createLog();
    };
    async function createLog() {
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
                    },
                }
            );
            console.log(result.data);
            if (result.data.message === "Student created successfully") {
                setErrorMessage('Student log created');
                setOpen(true);
                sessionStorage.setItem("token", result.data.token);

            } else {
                setErrorMessage('Please fill all details');
            }
        } catch (error) {
            console.log("Error" + error);

        }
    }


    return (
        <>
            <div>
                <Grid
                    container
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="flex-start"
                    style={{ gap: 15 }}
                >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        style={{ marginTop: "20px", marginLeft: "36px" }}
                    >
                        <Typography style={{ fontSize: "30px" }}>
                            Create a Student Log
                        </Typography>
                    </Grid>
                    {errorMessage && <Snackbar open={open} message={errorMessage} onClose={handleToClose} action={
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
                    } />}
                    <FileInput/>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                        {/* <Grid container marginBottom={5}>
                            

                        </Grid> */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="id"
                            label="Student ID"
                            name="id"
                            value={values.id}
                            onChange={handleChanges}
                            autoComplete="id"
                            autoFocus
                            color="secondary"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            value={values.name}
                            onChange={handleChanges}
                            autoComplete="name"
                            autoFocus
                            color="secondary"
                        />
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
                            color="secondary"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="number"
                            label="Number"
                            name="number"
                            value={values.number}
                            onChange={handleChanges}
                            autoComplete="number"
                            autoFocus
                            color="secondary"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 5, mb: 3 }}
                            color="secondary"
                        >
                            Create Record
                        </Button>
                    </Box>
                </Grid>
            </div>
        </>
    )
}