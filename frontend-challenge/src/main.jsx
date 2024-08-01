import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ActivityFeed from './components/ActivityFeed.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'
import NavigationBar from './components/NavigationBar.jsx'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element:  <>
    <NavigationBar /> 
    <ActivityFeed archived={false} />
    </>,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/archived',
    element:
    <>
    <NavigationBar /> 
    <ActivityFeed archived={true} />
    </>,
  }, 

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
