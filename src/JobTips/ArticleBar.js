import Grid from "@mui/material/Grid";
import {Empty} from "antd";
import {Link} from "react-navi";
import React, {useContext, useEffect, useState} from 'react'
import {useResource} from "react-request-hook";
import {UserContext} from "../context";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";

export default function ArticleBar() {

    const [postItemPageApi, setPostItemPageApi] = useState(1);
    const {user} = useContext(UserContext)
    const [articleList,getArticleList] = useResource(()=>({
        url:`/findPostsByUserId/${user.id}/${postItemPageApi}`,
        method:"GET"
    }))

    useEffect(()=> getArticleList(),[getArticleList,user.id,postItemPageApi])

    if(articleList.isLoading || !articleList.data){
        return (
            <>
                <Grid item xs={12} style={{fontWeight: "700", fontSize: "18px"}}>
                    My article list (0)
                </Grid>
                <Grid item xs={12}>
                    <Empty description={
                        <span> Wanna share something? <Link style={{color: "#f64"}}>Create Now</Link></span>
                    }/>
                </Grid>
            </>
        )
    }else{
        if(articleList.data.data.dataList.length === 0){
            return(
                <>
                    <Grid item xs={12} style={{fontWeight: "700", fontSize: "18px"}}>
                        My article list (0)
                    </Grid>
                    <Grid item xs={12}>
                        <Empty description={
                            <span> Wanna share something? <Link style={{color: "#f64"}}>Create Now</Link></span>
                        }/>
                    </Grid>
                </>
            )
        }else{

            return(
                <>
                    <Grid item xs={12} style={{fontWeight: "700", fontSize: "18px"}}>
                        My article list ({articleList.data.data.dataList.length})
                    </Grid>
                    {articleList.data.data.dataList.map((value,index)=>{
                        return(
                            <Grid key={index} item xs={12}>
                                {value.postTitle}
                            </Grid>
                        )
                    })}
                    {articleList.data.data.pages !== 1 &&

                        <Grid item xs={12} style={{textAlign: "center", marginTop: "30px"}}>
                        <Pagination count={articleList.data.data.pages}
                                    page={postItemPageApi}
                                    size={"small"}
                                    shape="rounded"
                                    onChange={(e, value) => setPostItemPageApi(value)}/>
                    </Grid>}
                    <Grid item xs={12}>
                        <Button variant="text" style={{
                            color: "#f64",
                            padding: "0px",
                            height: "34px"
                        }}
                        >
                            Create new article
                        </Button>
                    </Grid>
                </>
            )
        }
    }

}