import {useRequest, useResource} from "react-request-hook";
import {useContext, useEffect} from "react";
import {Spin} from "antd";
import ResponsiveAppBar from "../AppBar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {CommentSection} from 'react-comments-section'
import 'react-comments-section/dist/index.css'
import {UserContext} from "../context";
import "./index.css"
import moment from "moment";


export default function PostDetailPage({postId}) {

    const {user} = useContext(UserContext);
    const [postDetail, getPostDetail] = useResource(() => ({
        url: `findPostById/${postId}`,
        method: "GET"
    }))
    const [comments, getComments] = useResource(() => ({
        url: `findCommentsByPostId/${postId}`,
        method: "GET"
    }))
    const [, sendSubmitParentComments] = useRequest((data) => ({
        url: "insert-comment",
        method: "POST",
        data
    }))
    const [,sendSubmitChildRelation] = useRequest((data) => ({
        url:"insert-childComment",
        method:"POST",
        data
    }))
    const [, sendDeleteParentComment] = useRequest((comId) => ({
        url: `deleteParentComment/${comId}`,
        method: "GET"
    }))

    const [, sendDeleteChildComment] = useRequest((parent,child)=>({
        url:`deleteChildComment/${parent}/${child}`,
        method:"GET"
    }))

    const [, sendUpdateComment] = useRequest((comment)=>({
        url:'updateComment',
        method:"POST",
        data:comment
    }))

    const onReplyAction = async (data) => {
        let commentTemp = {}
        let relationTemp = {}
        commentTemp.id = data.comId
        commentTemp.postedBy = data.userId
        commentTemp.commentText = data.text
        commentTemp.commentDate = moment().format()
        commentTemp.postId = postId

        if(data.parentOfRepliedCommentId === undefined){
            relationTemp.parentCommentId = data.repliedToCommentId
        }else{
            relationTemp.parentCommentId = data.parentOfRepliedCommentId
        }
        relationTemp.childCommentId = data.comId
        console.log("relationTemp",relationTemp)
        const {ready} = sendSubmitParentComments(commentTemp)
        const {ready :ready2} = sendSubmitChildRelation(relationTemp)
        try{
            const response = await ready()
            const responseRelation = await ready2()
            console.log(response)
            console.log(responseRelation)
        }catch (e) {
            console.log(e)
        }
    }

    const onEditAction = async (data) =>{
        let temp = {}
        temp.id = data.comId
        temp.postedBy = data.userId
        temp.commentText = data.text
        temp.commentDate = moment().format()
        temp.postId = postId
        const {ready} = sendUpdateComment(temp)
        try{
            const response = await ready();
            console.log(response)
        }catch (e) {
            console.log(e)
        }
    }

    const onSubmitAction = async (data) => {
        let temp = {}
        temp.id = data.comId
        temp.postedBy = data.userId
        temp.commentText = data.text
        temp.commentDate = moment().format()
        temp.postId = postId
        const {ready} = sendSubmitParentComments(temp)
        try {
            const response = await ready();
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    const onDeleteAction = async (data) => {
        if (data.parentOfDeleteId === undefined) {
            const {ready} = sendDeleteParentComment(data.comIdToDelete)
            try {
                const response = await ready();
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        }else{
            const {ready} = sendDeleteChildComment(data.parentOfDeleteId,data.comIdToDelete)
            try{
                const response = await ready();
                console.log(response)
            }catch (e) {
                console.log(e)
            }
        }
    }

    useEffect(() => getPostDetail(), [postId, getPostDetail])
    useEffect(() => getComments(), [postId, getComments])

    return (
        <>
            <ResponsiveAppBar/>
            {postDetail.isLoading || !postDetail.data ? <Spin/> :
                <Grid container spacing={0} style={{backgroundColor: "#f5f5f7", paddingTop: "20px"}}>
                    <Grid item xs={2}/>
                    <Grid item xs={6}>
                        <div>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    '& > :not(style)': {
                                        m: 1,
                                        width: 1975,
                                        height: 840,
                                    },
                                }}
                                style={{paddingBottom: "20px", backgroundColor: "white", borderRadius: "13px"}}
                            >
                                <div>
                                    <Grid container spacing={2} style={{height: "fit-content", paddingLeft: "36px",maxHeight: '100%', overflow: 'auto'}}>
                                        <Grid item xs={12}
                                              style={{fontSize: "32px", fontWeight: "500", color: "#404040"}}>
                                            {postDetail.data.data.postTitle}
                                        </Grid>
                                        <Grid item xs={2} style={{
                                            fontSize: "14px",
                                            color: "hsla(0,0%,61.2%,.61176)",
                                            marginBottom: "40px",
                                            paddingTop: "0px"
                                        }}>
                                            {postDetail.data.data.postDate}
                                        </Grid>
                                        <Grid item xs={10} style={{
                                            fontSize: "14px",
                                            color: "#f64",
                                            marginBottom: "40px",
                                            paddingTop: "0px"
                                        }}>
                                            {postDetail.data.data.authorId}
                                        </Grid>
                                        <Grid item xs={12}
                                              style={{fontWeight: "400", lineHeight: "26px", color: "#404040"}}>
                                            {postDetail.data.data.postText}
                                        </Grid>
                                        <Grid item xs={12}>
                                            {comments.isLoading || !comments.data ? null : console.log(comments.data.data)}
                                            {comments.isLoading || !comments.data ? <Spin/> :
                                                <CommentSection
                                                    currentUser={!user.id ? null : {
                                                        currentUserId: user.id,
                                                        currentUserImg:
                                                            `https://ui-avatars.com/api/name=${user.username}&background=random`,
                                                        currentUserFullName: user.username
                                                    }}
                                                    logIn={{
                                                        loginLink: 'http://localhost:3000/sign-in',
                                                        signupLink: 'http://localhost:3000/sign-up'
                                                    }}
                                                    titleStyle={{fontSize: "24px"}}
                                                    submitBtnStyle={{backgroundColor: '#f64', border: "none"}}
                                                    commentData={comments.data.data}
                                                    onSubmitAction={onSubmitAction}
                                                    onDeleteAction={onDeleteAction}
                                                    onReplyAction={onReplyAction}
                                                    onEditAction={onEditAction}
                                                    currentData={(data) => {
                                                        console.log('curent data', data)
                                                    }}
                                                />}
                                        </Grid>
                                    </Grid>

                                </div>
                            </Box>
                        </div>
                    </Grid>
                    <Grid item xs={3}/>

                </Grid>

            }
        </>
    )
}