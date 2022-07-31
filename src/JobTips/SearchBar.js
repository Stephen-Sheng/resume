import Grid from "@mui/material/Grid";
import {OrangeBorderTextField} from "../SearchJobPage";
import Button from "@mui/material/Button";
import React from "react";

export default function SearchBar({searchContent,handleSearch}) {


    return (
        <>
            <Grid item xs={10}>
                <OrangeBorderTextField
                    {...searchContent.bindToInput}
                    autoFocus
                    margin="dense"
                    id="search"
                    label="Enter article keywords"
                    fullWidth
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={2} style={{marginTop: "7px"}}>
                <Button variant="contained" style={{
                    backgroundColor: "#f64",
                    padding: "10px",
                    height: "54px"
                }} onClick={handleSearch}
                >
                    Search
                </Button>
            </Grid>
        </>
    )
}