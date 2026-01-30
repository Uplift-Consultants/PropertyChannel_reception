import { createSlice } from '@reduxjs/toolkit';

const agentsSlice = createSlice({
    name: 'agents',
    initialState: {},
    reducers: {
        fetchedAgents: (state, action) => {
            state.agent = action.payload
        },
        updatedAgents: (state, action) => {
            state.agent = action.payload
        }
    }
})

export const { fetchedAgents, updatedAgents } = agentsSlice.actions

export default agentsSlice.reducer;
