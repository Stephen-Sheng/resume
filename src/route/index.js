import { mount, route } from 'navi'
import Home from '../Home'
import SignInSide from '../LoginPage'
import SignUp from "../register";
import MyResumePage from "../MyResumePage";
import ResumeEditor from "../ResumeEditor";
import {ResumeTemplate} from "../ResumeTemplate";

export const routes = mount({
  '/': route({ view: <Home /> }),
  '/sign-in': route({ view: <SignInSide />}),
  '/sign-up': route({view:<SignUp />}),
  '/cv': route({view:<MyResumePage />}),
  '/cv/editor': route({view:<ResumeEditor />}),
  '/cv/template':route({view:<ResumeTemplate />})
})