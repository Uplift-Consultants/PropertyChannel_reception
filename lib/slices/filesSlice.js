import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadFiles = createAsyncThunk(
  'upload/uploadFiles',
    async ({ files, folderId }, { getState, rejectWithValue, dispatch }) => {

      const state = getState();
      const token = state.auth.token;

      const formData = new FormData();
    
    // LOOP: Append each file to the SAME key 'files'
    // 'files' must match the first argument in upload.array('files') on the backend
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const response = await axios.post(`https://api.propertylist.app/v1/agent/files/upload/${folderId}`, formData, {
        headers: { 
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          // This calculates the aggregate progress of the TOTAL payload
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          dispatch(setProgress(progress));
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const uploadSlice = createSlice({
  name: 'upload',
  initialState: {
    progress: 0,
    status: 'idle', // idle | uploading | succeeded | failed
    fileUrl: null,
    error: null,
  },
  reducers: {
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    resetUpload: (state) => {
        state.progress = 0;
        state.status = 'idle';
        state.fileUrl = null;
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(uploadFiles.pending, (state) => {
            state.status = 'uploading';
            state.error = null;
        })
        .addCase(uploadFiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.fileUrl = action.payload.files;
        })
        .addCase(uploadFiles.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload || 'Upload failed';
        });
  },
});

export const { setProgress, resetUpload } = uploadSlice.actions;
export default uploadSlice.reducer;