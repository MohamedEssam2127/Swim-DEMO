// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.module.css'
import App from './App'
import Home from './pages/home/home'
import History from './pages/history/history'
import Inventory from './pages/inventory/inventory'
import Order from './pages/order/order'
import Profile from './pages/profile/profile'
import Reciept from './pages/reciept/reciept'
import SignIn from './pages/signin/signin'
import SignUp from './pages/signup/signup'
import Statistics from './pages/statistics/statistics'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "history",
        element: <History />
      },
      {
        path: "inventory",
        element: <Inventory />
      },
      {
        path: "order",
        element: <Order />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "reciept",
        element: <Reciept />
      },
      {
        path: "signin",
        element: <SignIn />
      },
      {
        path: "signup",
        element: <SignUp />
      },
      {
        path: "statistics",
        element: <Statistics />
      }
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>,
)
