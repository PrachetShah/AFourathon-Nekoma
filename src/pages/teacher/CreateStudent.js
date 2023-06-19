import React from "react";
import { useState } from "react";
import { Grid, Typography, TextField, Button, Box, Snackbar, IconButton } from "@mui/material";
import FileInput from "./components/FileInput";
import axios from "axios";
import { url } from "../../utils/api";
import { useNavigate } from "react-router-dom";


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
                        style={{ marginTop: "10px", marginLeft: "36px" }}
                    >
                        <Typography style={{ fontWeight: "800", fontSize: "30px" }}>
                            Add Students
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

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                        <FileInput />
                        <Grid container direction="row"
                            justifyContent="space-evenly"
                            alignItems="flex-start" marginBottom={1}>

                            <div style={{ fontWeight: "700", fontSize: "23px" }}>Add individual student record</div>
                        </Grid>
                        <Grid
                            container direction="column"
                            justifyContent="space-evenly"
                            alignItems="flex-start" marginBottom={1}>
                            <TextField
                                margin="normal"
                                required
                                style={{ boxColor: "black", width: "60vh" }}
                                id="id"
                                label="Student ID"
                                name="id"
                                value={values.id}
                                onChange={handleChanges}
                                autoComplete="id"
                                autoFocus

                            />
                            <TextField
                                margin="normal"
                                required
                                style={{ boxColor: "black", width: "60vh" }}
                                id="name"
                                label="Name"
                                name="name"
                                value={values.name}
                                onChange={handleChanges}
                                autoComplete="name"
                                autoFocus

                            />
                            <TextField
                                margin="normal"
                                required
                                style={{ boxColor: "black", width: "60vh" }}
                                id="email"
                                label="Email"
                                name="email"
                                value={values.email}
                                onChange={handleChanges}
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required

                                id="number"
                                label="Number"
                                name="number"
                                value={values.number}
                                onChange={handleChanges}
                                autoComplete="number"
                                autoFocus
                                style={{ boxColor: "black", width: "60vh" }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 5, ml: 20 }}
                                style={{ backgroundColor: "black", color: "white" }}
                            >
                                Create Record
                            </Button>
                        </Grid>
                    </Box>
                </Grid>
            </div>
        </>
    )
}