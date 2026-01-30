import { createSlice } from '@reduxjs/toolkit';

export const leadsSlice = createSlice({
  name: 'leads',
  initialState: {},
  reducers: {
    viewMessage: (state, action) => {
      state.lead = action.payload
    },
    allLeads: (state, action) => {
      state.lead = action.payload
    },
  },
})

export const { 
    viewLead,
    allLeads
 } = leadsSlice.actions
export default leadsSlice.reducer