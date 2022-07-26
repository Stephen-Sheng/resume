import Grid from "@mui/material/Grid";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {useInput} from "react-hookedup";
import ResponsiveAppBar from "../AppBar";
import Button from "@mui/material/Button";
import JobTabs from "./JobTabs";
import {useResource} from "react-request-hook";
import JobRecommendCard from "./JobRecommendCard";

const OrangeBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: #ff6644;
  }

  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #ff6644;
    }
  }
`;
export default function SearchJobPage() {

    const searchContent = useInput("")
    const [searchList, getSearchList] = useResource(() => ({
        url: `search-job/${searchContent.value}`,
        method: "GET"
    }))

    const handleSearch = () => {
        getSearchList()
    }

    return (
        <>
            <ResponsiveAppBar/>
            <Grid container spacing={0} style={{paddingTop: "28px", alignItems: "center", paddingBottom: "20px"}}>
                <Grid item xs={4}/>
                <Grid item xs={4}>
                    <OrangeBorderTextField
                        {...searchContent.bindToInput}
                        autoFocus
                        margin="dense"
                        id="search"
                        label="Enter job keywords"
                        fullWidth
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" style={{
                        backgroundColor: "#f64",
                        padding: "10px",
                        height: "54px"
                    }} onClick={handleSearch}
                    >
                        Search
                    </Button>
                </Grid>
                <Grid item xs={2}/>
            </Grid>
            <div style={{backgroundColor: "#f5f5f7", paddingTop: "30px"}}>
                <Grid container spacing={2}>
                    {searchList.isLoading || !searchList.data ? null :
                        searchList.data.data.map((value, index) => {
                            return (
                                <>
                                    <Grid item xs={3}/>

                                    <Grid item key={index} xs={6}>
                                        <JobRecommendCard name={value.itemname} city={value.city}
                                                          salary={value.salary} id={value.id} degree={value.degree}
                                                          company={value.company}></JobRecommendCard>
                                    </Grid>
                                    <Grid item xs={3}/>
                                </>
                            )
                        })
                    }
                    {searchList.isLoading || !searchList.data ?
                        <><Grid item xs={3}/>
                            <Grid item xs={7} style={{backgroundColor: "#f5f5f7"}}>
                                <JobTabs/>
                            </Grid>
                            <Grid item xs={2}/>
                        </> : null}
                </Grid>
            </div>
        </>
    )
}