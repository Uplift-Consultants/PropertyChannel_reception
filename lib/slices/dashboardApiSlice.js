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

export const dashboardApiSlice = createApi({
  baseQuery,
  reducerPath: 'dashboard',
  tagTypes: ['Dashboard'],
  endpoints: (builder) => ({
    totalProperties: builder.mutation({
      query: () => ({
        url: '/agent/dashboard',
        method: 'GET',
      }),
    }), 
  }),
});

export const { 
    useTotalPropertiesMutation
} = dashboardApiSlice;