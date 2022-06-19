import { mount, route } from 'navi'
import Home from '../Home'
import SignInSide from '../LoginPage'

export const routes = mount({
  '/': route({ view: <Home /> }),
  '/signin': route({ view: <SignInSide />})

})