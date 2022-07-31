import Grid from "@mui/material/Grid";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {useInput} from "react-hookedup";
import ResponsiveAppBar from "../AppBar";
import Button from "@mui/material/Button";
import JobTabs from "./JobTabs";
import {useResource} from "react-request-hook";
import SearchCard from "./SearchCard";
import {useState} from "react";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

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

    const [jobItemPageApi, setJobItemPageApi] = useState(1);
    const searchContent = useInput("")
    const [searchList, getSearchList] = useResource(() => ({
        url: `search-job/${searchContent.value}/${jobItemPageApi}`,
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
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: 1975,
                            height: 710,
                        },
                    }}
                    style={{paddingBottom: "20px",backgroundColor: "#f5f5f7"}}
                >
                    <div>
                <Grid container spacing={2} style={{height:"fit-content"}}>
                    {searchList.isLoading || !searchList.data ? null : <>
                        {searchList.data.data.dataList.map((value, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <Grid item xs={4}/>

                                    <Grid item xs={5}>
                                        <SearchCard name={value.itemname} city={value.city}
                                                    salary={value.salary} id={value.id} degree={value.degree}
                                                    company={value.company}/>
                                    </Grid>
                                    <Grid item xs={3}/>
                                </React.Fragment>
                            )
                        })}
                        <Grid item xs={4}/>
                        <Grid item xs={8} style={{textAlign:"center"}}>
                            <Pagination count={searchList.data.data.pages}
                                        page={jobItemPageApi}
                                        shape="rounded"
                                        onChange={(e, value) => setJobItemPageApi(value)}/>
                        </Grid>
                    </>
                    }
                    {searchList.isLoading || !searchList.data ?
                        <>
                            <Grid item xs={3}/>
                            <Grid item xs={7} style={{backgroundColor: "#f5f5f7"}}>
                                <JobTabs/>
                            </Grid>
                            <Grid item xs={2}/>
                        </> : null}
                </Grid>
                    </div>
                </Box>
            </div>
        </>
    )
}