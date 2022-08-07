import Grid from "@mui/material/Grid";
import {Empty, message} from "antd";
import {Link, useNavigation} from "react-navi";
import React, {useContext, useEffect, useState} from 'react'
import {useResource,useRequest} from "react-request-hook";
import {UserContext} from "../context";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";



export default function ArticleBar({deleteTrigger,setDeleteTrigger}) {

    const [postItemPageApi, setPostItemPageApi] = useState(1);
    const [open, setOpen] = useState(false);
    const {user} = useContext(UserContext)
    const [articleList, getArticleList] = useResource(() => ({
        url: `/findPostsByUserId/${user.id}/${postItemPageApi}`,
        method: "GET"
    }))
    const [,sendDeletePost] = useRequest((postId)=>({
        url:`/deletePost/${postId}`,
        method:"GET"
    }))
    const navigation = useNavigation()
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => getArticleList(), [getArticleList, user.id, postItemPageApi,deleteTrigger])

    async function handleDelete(id) {
        const {ready} = sendDeletePost(id)
        try {
            const response = await ready()
            message.success(`Delete successfully`);
            setDeleteTrigger(!deleteTrigger)

            console.log(response)
        }catch (e) {
            console.log(e)
        }
    }

    if (articleList.isLoading || !articleList.data) {
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
    } else {
        if (articleList.data.data.dataList.length === 0) {
            return (
                <>
                    <Grid item xs={12} style={{fontWeight: "700", fontSize: "18px"}}>
                        My article list (0)
                    </Grid>
                    <Grid item xs={12}>
                        <Empty description={
                            <span> Wanna share something? <Link href={'/article-edit'} style={{color: "#f64"}}>Create Now</Link></span>
                        }/>
                    </Grid>
                </>
            )
        } else {

            return (
                <>
                    <Grid item xs={12} style={{fontWeight: "700", fontSize: "18px"}}>
                        My article list ({articleList.data.data.total})
                    </Grid>
                    {articleList.data.data.dataList.map((value, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Grid item xs={6} style={{cursor: "pointer"}}
                                      onClick={() => navigation.navigate(`/post/${value.id}`)}>
                                    {value.postTitle}
                                </Grid>
                                <Grid item xs={6} style={{textAlign:"right"}}>
                                    <IconButton aria-label="delete" onClick={handleClickOpen}>
                                        <DeleteIcon />
                                    </IconButton>
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
                                                Are you sure you want to delete your article?
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button style={{color: "#f64"}} onClick={handleClose}>Cancel</Button>
                                            <Button style={{color: "#f64"}} onClick={()=>handleDelete(value.id)} autoFocus>
                                                Delete
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </Grid>
                                <Grid item xs={12} style={{paddingTop:"0px"}}>
                                    <Divider />
                                </Grid>
                            </React.Fragment>
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
                        }} onClick={() => navigation.navigate('article-edit')}
                        >
                            Create new article
                        </Button>
                    </Grid>
                </>
            )
        }
    }

}