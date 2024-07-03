import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name : "user",
    initialState : [
        {
            name : "",
            email : "",
            password : ""
        }
    ],
    reducers : {
        setUser : (state, action) => {
            state.name = action.payload.name
            state.email = action.payload.email
            state.password = action.payload.password
        },
        logout : (state, action) => {
            state.name = ""
            state.email = ""
            state.password = ""
        }
    }
})

export const { setUser, logout} = userSlice.actions
export default userSlice.reducer