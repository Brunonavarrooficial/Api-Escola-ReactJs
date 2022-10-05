import React from 'react';

import GlobalStyles from './styles/GlobalStyles';

import Header from './components/Header';

import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
      <GlobalStyles />
    </BrowserRouter>
  );
}

export default App;
