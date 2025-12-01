import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart/Cart';
import Search from './components/SearchBar/Search';
import Provider from './context/Provider';
import Login from './components/Login/Login'; 
import Buy from './components/Buy/Buy'; 
import Campanha from './components/Campanha/Campanha'; 
import Error404 from './components/404/error404'; 
import Colecoes from './components/Collections/Colecoes';
import { UserProvider } from './context/UserContext';
import { LanguageProvider } from './context/LanguageContext';
import SearchV from './components/SearchV/SearchV';
import BeachTennis from './components/Coleções/BeachTennis';
import Reds from './components/Coleções/Reds';
import Hoquei from './components/Coleções/Hoquei';
import Atletismo from './components/Coleções/Atletismo';
import Basquete from './components/Coleções/Basquete';


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/', element: <Home /> },
        { path: 'cart', element: <Cart /> },
        { path: 'search', element: <Search /> },
        { path: 'login', element: <Login /> },
        { path: 'buy', element: <Buy /> },
        { path: 'collections', element: <Colecoes /> },
        { path: 'campanha', element: <Campanha /> },
        { path: 'collections/colecao-basquete', element: <Basquete /> },
        { path: 'collections/colecao-atletismo', element: <Atletismo /> },
        { path: 'collections/colecao-hoquei', element: <Hoquei /> },
        { path: 'collections/colecao-reds', element: <Reds /> },
        { path: 'collections/colecao-beachtennis', element: <BeachTennis /> },
        { path: '/results', element: <SearchV /> },
        { path: '*', element: <Error404 /> }
      ],
    },
  ],
  {
    basename: '/ONCE11',
  }
);

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Elemento root não encontrado');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <UserProvider>
      <LanguageProvider>
        <Provider>
          <RouterProvider router={router} />
        </Provider>
      </LanguageProvider>
    </UserProvider>
  </React.StrictMode>
);
