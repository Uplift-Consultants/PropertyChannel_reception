import { configureStore } from '@reduxjs/toolkit';
import { agentApiSlice } from './slices/agentApiSlice';
import { dashboardApiSlice } from './slices/dashboardApiSlice';
import { propertyApiSlice } from './slices/propertyApiSlice';
import { leadsApiSlice } from './slices/leadsApiSlice';
import authReducer from './slices/authSlice';
import agentReducer from './slices/agentSlice';
import dashboardReducer from './slices/dashboardSlice';
import propertyReducer from './slices/propertySlice';
import leadsReducer from './slices/leadsSlice';
import folderReducer from './slices/folderSlice';
import uploadReducer from './slices/filesSlice';


export function makeStore() {
  return configureStore({
    reducer: {
        [agentApiSlice.reducerPath]: agentApiSlice.reducer,
        [dashboardApiSlice.reducerPath]: dashboardApiSlice.reducer,
        [propertyApiSlice.reducerPath]: propertyApiSlice.reducer,
        [leadsApiSlice.reducerPath]: leadsApiSlice.reducer,
        auth: authReducer,
        dashboardInfo: dashboardReducer,
        property: propertyReducer,
        leads: leadsReducer,
        agents: agentReducer,
        folders: folderReducer,
        upload: uploadReducer
    }, 
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        agentApiSlice.middleware, 
        dashboardApiSlice.middleware,
        propertyApiSlice.middleware,
        leadsApiSlice.middleware
    ],
})};

export const store = makeStore(); 