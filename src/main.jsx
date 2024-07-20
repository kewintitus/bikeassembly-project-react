import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './page/login/Login.jsx';
// import Navbar from './components/Navbar/Navbar.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import Home from './page/home/Home.jsx';
import Assemble from './page/assemble/Assemble.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      { path: '/assemble', element: <Assemble /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="appBase">
      {/* <Navbar /> */}
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </div>
  </React.StrictMode>
);
