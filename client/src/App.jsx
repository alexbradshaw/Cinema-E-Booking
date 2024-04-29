import React, { createContext, useReducer } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet } from 'react-router-dom';
import Navbar from './views/components/Navbar';
import './App.css'

export const AuthContext = createContext();
const queryClient = new QueryClient()

const initialState = {
  admin: {
    isAdmin: false,
    permissions: {}
  },
  auth: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RESET':
      localStorage.removeItem("auth");
      localStorage.removeItem("admin");
      return initialState;
    case 'SET_ADMIN':
      localStorage.setItem('admin', action.payload.isAdmin);
      localStorage.setItem('permissions', JSON.stringify(action.payload.permissions));
      return { ...state, admin: action.payload };
    case 'SET_AUTH':
      return { ...state, auth: action.payload };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className='app'>
      <AuthContext.Provider value={{ ...state, dispatch }}>
        <QueryClientProvider client={queryClient}>
          <Navbar/>
          <Outlet />
        </QueryClientProvider>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
