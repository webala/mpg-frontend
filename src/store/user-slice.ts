import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   user: {},
   isAuth: false
}

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      login(state, action) {
         state.user = action.payload
         state.isAuth = true
      },
      logout(state) {
         state.user = {}
         state.isAuth = false
      }
   }
})

export const userActions = userSlice.actions
export default userSlice

