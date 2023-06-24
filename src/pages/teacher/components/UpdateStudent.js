import React from "react";
import { useState, useEffect } from "react";
import { Grid, Typography, TextField, Button, Box, Snackbar, IconButton } from "@mui/material";
import axios from "axios";
import { url } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import img from '../createstudent.svg';

export default function UpdateStudent(idd, namee, emaill, numberr) {
    let token = sessionStorage.getItem('token')
    const [errorMessage, setErrorMessage] = useState(""); //for alert
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [number, setNumber] = useState(null);
    const history = useNavigate();

    const handleToClose = (event, reason) => {
        if ("clickaway" === reason) return;
        setOpen(false);
        history("/allRecords")
    };
    useEffect(() => {
        let updateStudents = async () => {
            setName(namee);
            setId(idd)
            setEmail(emaill)
            setNumber(numberr)
        };
        updateStudents();
    }, [id]);


    const editLog = async () => {
        let formField = new FormData();

        formField.append("name", name);
        formField.append("id", id);
        formField.append("email", email);
        formField.append("number", number);

        await axios({
            method: "PUT",
            url: `${url}student/${id}`,
            headers: { Authorization: `Bearer ${token}` },
            data: formField,
        }).then((response) => {
            console.log(response);
            history("/allRecords");
        });
    };
    return (
        <>
            <div>
                <Grid container direction="row"
                    justifyContent="center"
                    alignItems="flex">

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
                            style={{ alignItems: "flex", justifyContent: "center", marginTop: "10px", marginLeft: "36px", textAlign: 'center' }}
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
                        <img style={{ width: "400px", height: "400px" }} src={img} />
                        <Box component="form" sx={{ mt: 3 }}>

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
                                    // required
                                    style={{ boxColor: "black", width: "60vh" }}
                                    //id="id"
                                    label="Student ID"
                                    name="id"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                // autoComplete="id"
                                // autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    //required
                                    style={{ boxColor: "black", width: "60vh" }}
                                    //id="name"
                                    label="Name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    //autoComplete="name"
                                />
                                <TextField
                                    margin="normal"
                                    //required
                                    style={{ boxColor: "black", width: "60vh" }}
                                    //id="email"
                                    label="Email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    //autoComplete="email"
                                />
                                <TextField
                                    margin="normal"
                                    //required
                                    //id="number"
                                    label="Number"
                                    name="number"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                    //autoComplete="number"
                                    style={{ boxColor: "black", width: "60vh" }}
                                />
                                <Button
                                    type="submit"
                                    onClick={editLog}
                                    variant="contained"
                                    sx={{ mt: 5, ml: 20 }}
                                    style={{ backgroundColor: "black", color: "white" }}
                                >
                                    Update Record
                                </Button>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}