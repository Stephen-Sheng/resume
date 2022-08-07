import React, {useState, useContext, useEffect} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Grid from "@mui/material/Grid";
import EditorToolBar, {formats, modules} from "../utils/EditorToolBar";
import parse from 'html-react-parser';
import {UserContext} from "../context";
import moment from "moment";
import {OrangeBorderTextField} from "../SearchJobPage";
import {useInput} from "react-hookedup";
import Button from "@mui/material/Button";
import './index.css'
import {useRequest} from "react-request-hook";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { message, Upload} from 'antd';
import Divider from "@mui/material/Divider";
import {useNavigation} from "react-navi";



export default function ArticleEditPage() {

    const [value, setValue] = useState('');
    const [open, setOpen] = useState(false);
    const [coverUrl,setCoverUrl] = useState('');
    const title = useInput("")
    const summary = useInput("")
    const {user} = useContext(UserContext)
    const [, sendSavePost] = useRequest((data) => ({
        url: '/insert-post',
        method: "POST",
        data
    }))
    const navigation = useNavigation();

    useEffect(()=>{
        if(!user.id){
            navigation.navigate('/sign-in')
        }
    },[user.id,navigation])
    const props = {
        name: 'photo',
        action: 'http://localhost:8080/api/upload',
        headers: {
            authorization: 'authorization-text',
        },
        maxCount: 1,
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }

            if (info.file.status === 'done') {
                setCoverUrl(info.file.response.data.URL)
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function handlePublish() {
        if (title.value.length === 0 || coverUrl.length === 0 || summary.value.length === 0) {
            handleClickOpen()
        } else {
            const temp = {
                postText: value,
                postTitle: title.value,
                authorId: user.id,
                cover:coverUrl,
                postDate: moment().format('MMMM Do YYYY'),
                category: "IT",
                summary:summary.value
            }
            const {ready} = sendSavePost(temp)
            try {
                const response = await ready()
                message.success(`The article published successfully`);
                navigation.goBack()
                console.log(response)
            } catch (e) {
                console.log(e)
            }
            console.log(temp)
        }

    }

    return (
        <>
            <Grid container spacing={2} style={{height: "800px"}}>
                <Grid item xs={6}>
                    <OrangeBorderTextField
                        {...title.bindToInput}
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Enter the title of this article..."
                        fullWidth
                        variant="outlined"
                    />
                    <OrangeBorderTextField
                        {...summary.bindToInput}
                        autoFocus
                        margin="dense"
                        id="summary"
                        label="Enter the Summary of this article..."
                        fullWidth
                        variant="outlined"
                    />

                    <EditorToolBar/>
                    <ReactQuill theme="snow" placeholder={"Write Something awesome..."} style={{height: "100%"}}
                                value={value} onChange={setValue} formats={formats} modules={modules}/>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={2}
                          style={{height: "fit-content", paddingLeft: "36px", maxHeight: '100%', overflow: 'auto'}}>
                        <Grid item xs={12} style={{ marginTop: "10px"}}>
                            <Grid container spacing={0}>
                                <Grid item xs={6}>
                                    <Upload {...props}>
                                        <Button variant="outlined" style={{
                                            borderRadius: "4px",color:"#f64",borderColor:"#f64", height: "150%", fontWeight: "550"
                                        }}> Upload Cover </Button>
                                    </Upload>
                                </Grid>
                                <Grid item xs={6} style={{textAlign:"center",marginRight:"0px"}}>
                                    <Button variant="contained" style={{
                                        borderRadius: "4px", background: "#ff3d3d", fontWeight: "550"
                                    }} onClick={handlePublish}> Publish </Button>
                                </Grid>
                            </Grid>
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
                                        Sorry,your article must have a title, summary and cover!
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button style={{color: "#f64"}} onClick={handleClose}>Cancel</Button>
                                    <Button style={{color: "#f64"}} onClick={handleClose} autoFocus>
                                        OK
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}
                              style={{fontSize: "32px", fontWeight: "500", color: "#404040"}}>
                            {title.value.length === 0 ? "Enter the title of this article..." : title.value}
                        </Grid>
                        <Grid item xs={2} style={{
                            fontSize: "14px",
                            color: "hsla(0,0%,61.2%,.61176)",
                            marginBottom: "40px",
                            paddingTop: "0px"
                        }}>
                            {moment().format('MMMM Do YYYY') // August 6th 2022, 6:26:38 pm
                            }
                        </Grid>
                        <Grid item xs={10} style={{
                            fontSize: "14px",
                            color: "#f64",
                            marginBottom: "40px",
                            paddingTop: "0px"
                        }}>
                            {user.username}
                        </Grid>
                        <Grid item xs={12}
                              style={{fontWeight: "400", lineHeight: "26px", color: "#404040"}}>
                            {parse(value)}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )

}