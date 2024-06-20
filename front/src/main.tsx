import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/auth',
    element: <h2>404 page</h2>
  },
  {
    path: '/auth/signup',
    element: <h1>Sig up page</h1>
  },
  {
    path: '/auth/login',
    element: <h1>Login page</h1>
  },
  {
    path: '*',
    element: <h2>404 Page</h2>
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
