import { createSlice } from '@reduxjs/toolkit';

const folderSlice = createSlice({
    name: 'folders',
    initialState: [],
    reducers: {
        folders: (_, action) => action.payload,
    }
})

export const { folders } = folderSlice.actions

export default folderSlice.reducer;