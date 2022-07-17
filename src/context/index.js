import React from "react"

export const UserContext = React.createContext({
    user: {username: null, email: null, id: null}, userDispatch: () => {
    }
})

export const SnackContext = React.createContext({
    setSnackOpen: open => {
        return open
    },
    setSnackMsg: msg => {
        return msg
    }
})