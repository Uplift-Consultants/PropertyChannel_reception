import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null
    },
    reducers: {
        setAuthCookie: (state, action) => {
            state.token = action.payload;
        },
        authentic: (state, action) => {
            state.user = action.payload.user,
            state.agent = action.payload.agent
        },
        editFullName: (state, action) => {
            state.agent.fullName = action.payload
        },
        editEmail: (state, action) => {
            state.agent.email = action.payload
        },
        editPhonePrimary: (state, action) => {
            state.agent.phone.primary = action.payload
        },
        editPhoneSecondary: (state, action) => {
            state.agent.phone.secondary = action.payload
        },
    }, 
})

export const { setAuthCookie, authentic, editFullName, editEmail, editPhonePrimary, editPhoneSecondary } = authSlice.actions

export default authSlice.reducer;
