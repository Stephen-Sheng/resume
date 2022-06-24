import React from "react"

export const UserContext = React.createContext({user:{username:null,email:null,id:null}, userDispatch:()=>{}})