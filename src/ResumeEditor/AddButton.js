import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import * as React from "react";


export default function AddButton(props){
    const {isHovering, handleClick} = props
    return(
        <>
        {isHovering ?
                <Grid item xs={9} style={{textAlign: "right", paddingRight: "60px"}}>
                    <IconButton aria-label="add" size="medium"
                                onClick={() => handleClick(null)}
                                style={{padding: "0px", top: "8px"}}>
                        <AddBoxIcon fontSize="inherit"/>
                    </IconButton>
                </Grid> : null}
        </>
    )
}