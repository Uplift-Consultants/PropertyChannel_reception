'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@lib/store';
import { setAuthCookie } from '@lib/slices/authSlice';

export default function StoreProvider({ cookieToken, children }) {

  const storeRef = useRef();

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    
    // Inject the cookie data into the store immediately
    if (cookieToken) {
      storeRef.current.dispatch(setAuthCookie(cookieToken));
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
} 