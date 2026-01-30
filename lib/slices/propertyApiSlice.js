import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

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
export const propertyApiSlice = createApi({
  baseQuery,
  reducerPath: 'properties',
  tagTypes: ['Properties', 'Property'],
  endpoints: (builder) => ({
    addProperty: builder.mutation({
      query: ({category}) => ({
        url: '/agent/properties',
        method: 'POST',
        body: {category},
      }),
      invalidatesTags: ['Properties'],
    }), 
    getProperty: builder.query({
      query: (id) => ({
        url: `/agent/properties/${id}`,
        method: 'GET'
      }),
      providesTags: ['Property'],
    }),
    updateProperty: builder.mutation({
      query: (property) => {
        return {
          url: `/agent/properties/${property._id}`,
          method: 'PUT',
          body: property
        }
      },
      invalidatesTags: ['Properties', 'Property'],
    }),
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `/agent/properties/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Properties']
    }),
    getProperties: builder.query({
      query: () => ({
        url: '/agent/properties',
        method: 'GET'
      }),
      providesTags: ['Properties'],
    }),
  uploadImages: builder.mutation({
  // Move logic into queryFn to ensure the server response is returned
  async queryFn({ file, propertyId, onProgress }, { getState }) {
    try {
      const state = getState();
      const token = state.auth.token;

      if (!token) {
        return { error: { status: 401, data: "User is not authenticated" } };
      }

      const formData = new FormData();
      formData.append('images', file);

      const response = await axios.post(
        `https://api.propertylist.app/v1/agent/upload/${propertyId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (event) => {
            const percent = Math.round((event.loaded * 100) / event.total);
            if (onProgress) onProgress(percent);
          },
        }
      );

      // RTK Query expects the success result to be wrapped in a 'data' object
      // This is what will be returned by .unwrap() in your component
      return { data: response.data }; 

    } catch (error) {
      return {
        error: {
          status: error.response?.status || 500,
          data: error.response?.data || error.message,
        },
      };
    }
  },
  invalidatesTags: ['Property'], // Usually mutations 'invalidate', not 'provide'
}),
    updateAgents: builder.mutation({
      query: ({id, agents}) => {
        return {
          url: `/agent/properties/${id}`,
          method: 'PUT',
          body: {
            agent: agents
          }
        };
      }
    }),
    publishListing: builder.mutation({
      query: (id) => {
        return {
          url: `/agent/properties/publish/${id}`,
          method: 'PUT',
        }
      },
      invalidatesTags: ['Properties', 'Property'],
    }),     
  }),
});

export const { 
  useAddPropertyMutation, 
  useGetPropertyQuery,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
  useGetPropertiesQuery, 
  useUploadImagesMutation,
  useUpdateAgentsMutation,
  usePublishListingMutation
} = propertyApiSlice;