import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import React from "react";
import Dialog from "@mui/material/Dialog";


export function deepCopy(aObject) {
    // Prevent undefined objects
    // if (!aObject) return aObject;

    let bObject = Array.isArray(aObject) ? [] : {};

    let value;
    for (const key in aObject) {

        // Prevent self-references to parent object
        // if (Object.is(aObject[key], aObject)) continue;
        if (key === 'time') continue
        value = aObject[key];

        bObject[key] = (typeof value === "object") ? deepCopy(value) : value;
    }

    return bObject;
}

export function degreeConvert(degree){
    let level
    const options = ["Senior High School", "High School", "Diploma", "Bachelor", "Master", "Doctor", "MBA"]
    switch (degree) {
        case options[0] :
            level = 1
            break
        case options[1]:
            level = 2
            break
        case options[2]:
            level = 3
            break
        case options[3]:
            level = 4
            break
        case options[4]:
            level = 5
            break
        case options[5]:
            level = 6
            break
        case options[6]:
            level = 7
            break
    }
    return level
}

export function MyDialog(props){

    const {open,handleClose,text,btnText} = props
    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Alert"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button style={{color: "#f64"}} onClick={handleClose}>Cancel</Button>
                <Button style={{color: "#f64"}} onClick={handleClose} autoFocus>
                    {btnText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}