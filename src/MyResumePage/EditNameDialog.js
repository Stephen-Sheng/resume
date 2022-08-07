import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import {OrangeBorderTextField} from "../SearchJobPage";
import {useRequest} from "react-request-hook";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";


export default function EditNameDialog({id,dialogOpen,setDialogOpen,newResumeName,setFinalName}) {

    const [snackOpen, setSnackOpen] = React.useState(false);
    const handleSnackClickOpen = () => {
        setSnackOpen(true);
    };
    const [snackStatus,setSnackStatus] = React.useState({level:"success",msg:"Update Successfully!"});

    const handleSnackClose = () => {
        setSnackOpen(false);
    };

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
            setSnackStatus({level:"success",msg:"Update Successfully!"})
            handleSnackClickOpen()
            handleClose()
            console.log(response)
        } catch (e) {
            console.log(e)
            setSnackStatus({level:"error",msg:"Submit error!"})

        }
    }

    return (
        <>
            <Snackbar
                autoHideDuration={6000}
                anchorOrigin={{vertical:'top',horizontal:'center'}}
                open={snackOpen}
                onClose={handleSnackClose}
            >
                <Alert severity={snackStatus.level}>{snackStatus.msg}</Alert>
            </Snackbar>
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