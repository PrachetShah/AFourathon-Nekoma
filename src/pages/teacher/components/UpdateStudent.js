import React from "react";
import { useState, useEffect } from "react";
import { Grid, Typography, TextField, Button, Box, Snackbar, IconButton } from "@mui/material";
import axios from "axios";
import { url } from "../../../utils/api";
import { useParams, useNavigate } from "react-router-dom";
import img from '../../../assets/createstudent.svg';

export default function UpdateStudent() {
    let token = sessionStorage.getItem('token')
    const { id } = useParams();
    const [errorMessage, setErrorMessage] = useState(""); //for alert
    const [open, setOpen] = useState(false);
    const [idd, setId] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [number, setNumber] = useState();
    const history = useNavigate();

    const handleToClose = (event, reason) => {
        if ("clickaway" === reason) return;
        setOpen(false);
        history("/allRecords")
    };
    useEffect(() => {
        let updateStudent = async () => {
            const result = await axios.get(
                `${url}retrieve/${id}`, { headers: { Authorization: `Bearer ${token}` } }
            );
            setName(result.data.name);
            setId(result.data.id)
            setEmail(result.data.email)
            setNumber(result.data.number)
        };
        updateStudent();
    }, [id]);
    // console.log()

    const editLog = async () => {

        // formField.append("id", idd);
        // formField.append("name", name);
        // formField.append("email", email);
        // formField.append("number", number);
        let config = {
            "id": idd,
            "name": name,
            "email": email,
            "number": number
        }
        try {
            let result = await axios.put(
                `${url}student/${id}`,
                {
                    // config
                    id: idd,
                    name: name,
                    email: email,
                    number: number
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        'Authorization': "Bearer" + " " + token
                    },
                }
            );
            console.log(result.data);
            console.log(result.data.acccess_token);
            if (result.data.message === "Student updated successfully") {
                setErrorMessage('Student updated successfully');
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
                    setErrorMessage('student already exists');
                    setOpen(true);
                }
            }
        }
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
                            Update Students
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
                        <Box sx={{ mt: 3 }}>

                            <Grid container direction="row"
                                justifyContent="space-evenly"
                                alignItems="flex-start" marginBottom={1}>

                                <div style={{ fontWeight: "700", fontSize: "23px" }}>Update individual student record</div>
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
                                    //label="Student ID"
                                    name="id"
                                    value={idd}
                                    onChange={(e) => setId(e.target.value)}
                                // autoComplete="id"
                                // autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    //required
                                    style={{ boxColor: "black", width: "60vh" }}
                                    //id="name"
                                    //label="Name"
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
                                    //label="Email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                //autoComplete="email"
                                />
                                <TextField
                                    margin="normal"
                                    //required
                                    //id="number"
                                    //label="Number"
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