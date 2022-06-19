import './App.css';
import { RequestProvider } from 'react-request-hook';
import { axiosInstance } from './axios'
import { NotFoundBoundary, Router, View } from 'react-navi';
import { routes } from './route'
import { UserContext } from './context'
import { useReducer } from 'react';
import { userReducer } from './reducer';

function App() {

  const [user, userDispatch] = useReducer(userReducer, null)

  return (
    <RequestProvider value={axiosInstance}>
      <UserContext.Provider value={[user, userDispatch]}>
        <Router routes={routes}>
          <NotFoundBoundary render={() => <h1><span style={{ color: 'red' }}>Error:404 Not Found!</span></h1>}>
            <View />
          </NotFoundBoundary>
        </Router>
      </UserContext.Provider>
    </RequestProvider>
  )
}

export default App;
