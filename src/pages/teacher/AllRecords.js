import React from "react";
import Delete from "./components/Delete";
import Update from "./components/Update"; 
import CreateStudent from "./CreateStudent";

export default function AllRecords(){
    return(
        <>
        <div>cards w sapid, name, edit, delete 
            <p>button for CreateStudent</p>
        </div>
        <CreateStudent/>
        <Update/>
        <Delete/>

        </>
    )
}