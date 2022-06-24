import { mount, route } from 'navi'
import Home from '../Home'
import SignInSide from '../LoginPage'
import SignUp from "../register";

export const routes = mount({
  '/': route({ view: <Home /> }),
  '/sign-in': route({ view: <SignInSide />}),
  '/sign-up': route({view:<SignUp />})
})