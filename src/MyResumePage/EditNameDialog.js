import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import {OrangeBorderTextField} from "../SearchJobPage";
import {useRequest} from "react-request-hook";
import {useInput} from "react-hookedup";
import {message} from "antd";


export default function EditNameDialog({id,dialogOpen,setDialogOpen,setFinalName, resumeName}) {

    const newResumeName = useInput(resumeName)

    const handleClose = () => {
        setDialogOpen(false);
    };

    const [, sendEditResumeName] = useRequest((newName) => ({
        url: "/editResumeName",
        method: "POST",
        data: {id, newName}
    }))

    async function handleSubmit() {
        const {ready} = sendEditResumeName(newResumeName.value)
        try {
            const response = await ready()
            setFinalName(newResumeName.value)
            message.success(`Update successfully!`);
            handleClose()
            console.log(response)
        } catch (e) {
            console.log(e)
            message.error(`Submit error`);

        }
    }

    return (
        <>
            <Dialog open={dialogOpen} onClose={handleClose}>
                <DialogTitle>Resume Name</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} style={{paddingLeft: "20px"}}>
                        <Grid item xs={12} style={{paddingLeft:"0px"}}>
                            <OrangeBorderTextField
                                {...newResumeName.bindToInput}
                                autoFocus
                                margin="dense"
                                id="Name"
                                label="Name"
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button style={{color: "#f64"}} onClick={handleClose}>Cancel</Button>
                    <Button variant={"contained"} style={{backgroundColor:"#f64"}} onClick={handleSubmit}>Submit</Button>

                </DialogActions>
            </Dialog>
        </>
    )

}