import {mount, route} from 'navi'
import Home from '../Home'
import SignInSide from '../LoginPage'
import SignUp from "../register";
import MyResumePage from "../MyResumePage";
import ResumeEditor from "../ResumeEditor";
import {ResumeTemplate} from "../ResumeTemplate";
import SpecJobDetail from "../SpecJobDetail";
import JobItemDetail from "../JobItemDetail";
import SearchJobPage from "../SearchJobPage";
import JobTips from "../JobTips";
import PostDetailPage from "../PostDetailPage";
import ArticleEditPage from "../ArticleEditPage";

export const routes = mount({
    '/': route({view: <Home/>}),
    '/sign-in': route({view: <SignInSide/>}),
    '/sign-up': route({view: <SignUp/>}),
    '/cv': route({view: <MyResumePage/>}),
    '/cv/editor': route({view: <ResumeEditor/>}),
    '/cv/template': route({view: <ResumeTemplate/>}),
    '/job/:id': route(async req => {
        let id = req.params.id
        return {
            view: <SpecJobDetail id={id}/>,
        }
    }),
    '/jobItem/:id': route(async req => {
        let id = req.params.id
        return {
            view: <JobItemDetail id={id}/>,
        }
    }),
    '/recruiting':route({view:<SearchJobPage />}),
    '/tips':route({view:<JobTips />}),
    '/post/:id':route(async req=>{
        let id = req.params.id
        return{
            view:<PostDetailPage postId={id} />
        }
    }),
    '/article-edit':route({view:<ArticleEditPage />})

})