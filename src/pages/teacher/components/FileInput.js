import React from "react";
import axios from "axios";
import { url } from '../../../utils/api';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Snackbar, IconButton, Button } from "@mui/material";
import './FileInput.css';

export default function FileInput() {

    const [errorMessage, setErrorMessage] = useState(""); //for alert
    const [open, setOpen] = useState(false);
    const history = useNavigate();

    const handleToClose = (event, reason) => {
        if ("clickaway" === reason) return;
        setOpen(false);
        history("/allRecords")
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
            let result = await axios.post(
                url + "registerBulk", formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Accept: "application/json",
                    },
                }
            );
            console.log(result.data);
            if (result.data.message === "Students Registered Succesffuly") {
                setErrorMessage('Student log created');
                setOpen(true);
                sessionStorage.setItem("token", result.data.token);

            } else {
                setErrorMessage('error');
            }
        } catch (error) {
            console.log("Error" + error);

        }
    }
    return (

        <div>
            <span style={{ fontWeight: "700", fontSize: "23px" }}>Add students via csv file </span>
            <Button
                variant="contained"
                style={{ marginLeft: "2px", backgroundColor: "black", color: "white" }}>
                <label style={{ cursor: "pointer" }} htmlFor="input-img">Upload</label>
                <input type="file" id="input-img" onChange={handleSubmit} />
            </Button>
            <div style={{ fontWeight: "700", fontSize: "23px" }}>OR</div>
            {/* <input class="custom-file-input" type="file" onChange={handleSubmit} /> */}
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
        </div>
    )
}
