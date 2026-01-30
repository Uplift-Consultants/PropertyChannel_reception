import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.propertylist.app/v1',
  prepareHeaders: (headers, { getState }) => {

    const token = getState().auth.token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('x-api-key', '44db6620-767c-4e36-92fc-8ee61c5561d6');
    return headers;
  },
});

export const agentApiSlice = createApi({
  baseQuery,
  reducerPath: 'agent',
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getDashboardInfo: builder.query({
      query: () => ({
        url: '/agent/dashboard',
        method: 'GET',
      }),
    }), 
    getAgent: builder.mutation({
      query: () => ({
        url: '/agency/agent',
        method: 'GET',
      }),
    }),
    getAgents: builder.query({
      query: () => ({
        url: '/agency/agents',
        method: 'GET',
      }),
    }),
    updateAgentInfo: builder.mutation({
      query: (data) => {
        return {
          url: `/agent`,
          method: 'PUT',
          body: data
        };
      }
    }),
    uploadAgentProfilePicture: builder.mutation({
      query: (formData) => {
        return {
          url: `/agent/upload/profile-picture`,
          method: 'POST',
          body: formData
        };
      }
    }),
    updatePassword: builder.mutation({
      query: (data) => {
        return {
          url: '/',
          method: 'PUT',
          body: data
        }
      }
    }),
    createFolder: builder.mutation({
      query: ({ title }) => {
        return {
          url: '/agent/files',
          method: 'POST',
          body: { title }
        }
      }
    }),
    getFiles: builder.mutation({
      query: () => {
        return {
          url: '/agent/files',
          method: 'GET'
        }
      }
    }),
    uploadFile: builder.mutation({
      query: (id) => {
        return {
          url: `/agent/files/${id}`,
          method: 'POST',
          body: {}
        }
      }
    }),
  }),
});


export const { 
  useGetDashboardInfoQuery,
  useGetAgentMutation,
  useGetAgentsQuery,
  useUpdateAgentInfoMutation,
  useUploadAgentProfilePictureMutation,
  useUpdatePasswordMutation,
  useCreateFolderMutation,
  useGetFilesMutation,
  useUploadFileMutation
} = agentApiSlice;