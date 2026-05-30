// import { StrictMode } from 'react'
import Home from './pages/home/home.js';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App is the main layout
    children: [
      {
        path: "/",
        element: <Home />, // Renders when the URL is exactly "/"
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>,
)
