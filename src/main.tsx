import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart/Cart';
import Search from './components/SearchBar/Search';
import Provider from './context/Provider';
import { Login } from './components/Login/Login'; 
import Buy from './components/Buy/Buy'; 
import SobreNos from './components/SobreNos/SobreNos';
import Promocional from './components/Collections/Promocional';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'cart', element: <Cart /> },
      { path: 'search', element: <Search /> },
      { path: 'login', element: <Login /> },
      { path: 'buy', element: <Buy /> },
      { path: 'sobrenos', element: <SobreNos /> },
      { path: 'promocional', element: <Promocional /> },
    ],
  },
]);

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Elemento root não encontrado');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);