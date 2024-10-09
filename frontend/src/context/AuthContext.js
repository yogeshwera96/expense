// src/context/AuthContext.js

import React, { createContext, useReducer, useContext, useEffect } from 'react';

// Create AuthContext
export const AuthContext = createContext();

// Auth Reducer
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

// AuthContextProvider Component
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null 
  });

  useEffect(() => {
 const user = JSON.parse(localStorage.getItem('user'))

 if (user) {
   dispatch({ type: 'LOGIN', payload: user})
 }
  },[])
  console.log('AuthContext state:', state);
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};
