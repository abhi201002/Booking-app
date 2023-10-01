import { useEffect } from "react"

export const authinitialState ={
    user: JSON.parse(localStorage.getItem('user')),
    loading: false,
    error: null
}

export const authreducer = (state, action) =>{
    // useEffect(() =>{
    //     localStorage.setItem("user", JSON.stringify(state.user))
    // },[state.user])
    switch(action.type){
        case "LOGIN_START":
            return{
                user: null,
                loading: true,
                error: null
            }
        case "LOGIN_SUCCESS":
            return{
                user: JSON.parse(localStorage.getItem('user')),
                loading: false,
                error: null
            }
            localStorage.setItem("user", JSON.stringify(action.payload))
        case "LOGIN_FAILURE":
            return{
                user: null,
                loading: false,
                error: action.payload
            }
        case "LOGOUT":
            return{
                user: null,
                loading: false,
                error: null
            }
        default:
            return state
    }
}