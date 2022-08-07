import React, {useEffect, useState} from 'react'
import ResponsiveAppBar from "../AppBar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {useResource} from "react-request-hook";
import Pagination from "@mui/material/Pagination";
import PostList from "./PostList";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import ArticleBar from "./ArticleBar";
import SearchBar from "./SearchBar";
import {useInput} from "react-hookedup";
import {Empty} from "antd";


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography component={"span"}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default function JobTips() {
    const searchContent = useInput("")
    const [value, setValue] = React.useState(0);
    const [jobItemPageApi, setJobItemPageApi] = useState(1);
    const [searchItemPageApi, setSearchItemPageApi] = useState(1);
    const [isSearch,setIsSearch] = useState(false);
    const [deleteTrigger,setDeleteTrigger] = useState(false);

    const [postsList, getPostsList] = useResource(() => ({
        url: `getPostsList/${jobItemPageApi}`,
        method: "GET"
    }))

    const [searchList,getSearchList] = useResource(()=> ({
        url: `searchByCondition/${searchContent.value}/${searchItemPageApi}`,
        method:"GET"
    }))

    const handleChange = (event, newValue) => {
        console.log(newValue)
        setValue(newValue);
    };

    const handleSearch = () => {
        getSearchList()
        if(searchContent.value === ""){
            setIsSearch(false)
        }else{
            setIsSearch(true)
        }
    }
    useEffect(() => getPostsList(), [getPostsList,jobItemPageApi,deleteTrigger])

    return (
        <React.Fragment>
            <ResponsiveAppBar/>
            <Grid container spacing={0} style={{backgroundColor: "#f5f5f7"}}>
                <Grid item xs={2}/>
                <Grid item xs={6} style={{marginTop: "20px"}}>
                    <div>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                '& > :not(style)': {
                                    m: 1,
                                    width: 1975,
                                    height: 860,
                                },
                            }}
                            style={{paddingBottom: "20px", backgroundColor: "white", borderRadius: "13px"}}
                        >
                            <div>
                                <Grid container spacing={0} style={{height: "fit-content"}}>
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        textColor={"inherit"}
                                        TabIndicatorProps={{
                                            style: {
                                                backgroundColor: "#f64",
                                                height: "3px",
                                            }
                                        }}
                                        style={{paddingLeft: "10px", backgroundColor: "white", fontSize: "22px"}}
                                        aria-label="secondary tabs example"
                                    >
                                        <Tab value={0}
                                             label={<span
                                                 style={value === 0 ? {fontSize: "20px"} : {fontSize: "18px"}}>Recommendation</span>}/>
                                    </Tabs>
                                    <TabPanel value={value} index={0} style={{backgroundColor: "white"}}>
                                        {postsList.isLoading || !postsList.data || isSearch ? null : <>
                                            {postsList.data.data.dataList.map((value, index) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <PostList id={value.id} cover={value.cover} postTitle={value.postTitle}
                                                                  summary={value.summary} category={value.category}
                                                                  postDate={value.postDate}/>
                                                        <Grid item xs={3}/>
                                                    </React.Fragment>
                                                )
                                            })}
                                            <Grid item xs={8} style={{textAlign: "center", marginTop: "30px"}}>
                                                <Pagination count={postsList.data.data.pages}
                                                            page={jobItemPageApi}
                                                            shape="rounded"
                                                            onChange={(e, value) => setJobItemPageApi(value)}/>
                                            </Grid>
                                        </>
                                        }

                                        {searchList.isLoading || !searchList.data || !isSearch ? null: <>
                                            {searchList.data.data.dataList.map((value,index)=>{
                                                return(
                                                    <React.Fragment key={index}>
                                                        <PostList cover={value.cover} postTitle={value.postTitle}
                                                                  summary={value.summary} category={value.category}
                                                                  postDate={value.postDate}/>
                                                        <Grid item xs={3}/>
                                                    </React.Fragment>
                                                )
                                            })}
                                            {searchList.data.data.pages === 0? <Empty style={{marginTop:"100px"}} description={
                                                <span> No result</span>
                                            }/>: <Grid item xs={8} style={{textAlign: "center", marginTop: "30px"}}>
                                                <Pagination count={searchList.data.data.pages}
                                                            page={searchItemPageApi}
                                                            shape="rounded"
                                                            onChange={(e, value) => setSearchItemPageApi(value)}/>
                                            </Grid>}
                                        </> }
                                    </TabPanel>

                                </Grid>
                            </div>
                        </Box>
                    </div>
                </Grid>
                <Grid item xs={3} style={{marginLeft: "30px", marginTop: "20px"}}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                m: 1,
                                width: 375,
                                height: 860,
                            },
                        }}
                        style={{paddingBottom: "20px", backgroundColor: "white", borderRadius: "13px"}}
                    >
                        <Grid container spacing={2} style={{height: "fit-content",alignItems:"center"}}>
                            <SearchBar searchContent={searchContent} handleSearch={handleSearch} />
                            <ArticleBar deleteTrigger={deleteTrigger} setDeleteTrigger={setDeleteTrigger}/>

                        </Grid>
                    </Box>
                </Grid>
            </Grid>

        </React.Fragment>
    )
}