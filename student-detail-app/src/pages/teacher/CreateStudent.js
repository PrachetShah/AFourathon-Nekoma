import React from "react";
import Delete from "./components/Delete";
import Update from "./components/Update";

export default function CreateStudent() {
    return (
        <>
            <div>
                <p>Student Name
                    Student ID Number
                    Student Email
                    Student Phone Number</p>
                    <Delete/>
                    <Update/>
            </div>
        </>
    )
}