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
    case 'checkPerms':
      let perms = JSON.parse(localStorage.getItem('permissions'))
      if (state.admin.permissions != perms) {
        let newPerms = {
          isAdmin: state.admin.isAdmin,
          permissions: perms
        }
        return { ...state, admin: newPerms };
      }
      return state;
    case 'SET_ADMIN':
      const admin = {
        isAdmin: action.payload.isAdmin,
        permissions: action.payload.permissions ? action.payload.permissions : {}
      }
      localStorage.setItem('admin', admin.isAdmin);
      localStorage.setItem('permissions', JSON.stringify(admin.permissions));

      return { ...state, admin: admin };
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
