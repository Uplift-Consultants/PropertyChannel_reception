import { createSlice } from '@reduxjs/toolkit';

export const dashboardSlice = createSlice({
  name: 'dashboardInfo',
  initialState: {
    properties: {
        total: null
    }
  },
  reducers: {
    totalPropertiesInfo: (state, action) => {
      state.properties = action.payload
    },
  },
})

export const { 
    totalPropertiesInfo
 } = dashboardSlice.actions
export default dashboardSlice.reducer