import React from 'react';
import { Router } from 'react-router-dom';

// history
import history from './services/history';
// estilos de cores
import GlobalStyles from './styles/GlobalStyles';
// cabeçalho navbar
import Header from './components/Header';

import Routes from './routes';

function App() {
  return (
    <Router history={history}>
      <Header />
      <Routes />
      <GlobalStyles />
    </Router>
  );
}

export default App;
