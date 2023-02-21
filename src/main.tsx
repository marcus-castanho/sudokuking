import React from 'react';
import ReactDOM from 'react-dom/client';
import { Main } from './pages';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router={router} />,
);
