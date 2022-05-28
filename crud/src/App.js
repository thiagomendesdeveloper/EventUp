import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {Home} from './pages/Home';
import {VisualizarAnuncio} from './pages/VisualizarAnuncio'
import {CadastrarAnuncio} from './pages/Cadastrar/CadastrarAnuncio';
import {EditarAnuncio} from './pages/EditarAnuncio';
import {EditarAnuncioimg} from './pages/editarAnuncioimg';

import {Menu} from './Components/Menu';

function App() {
  return (
    <div>
      <Menu />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/visualizar-anuncio/:id" component={VisualizarAnuncio} />
          <Route path="/cadastrar-anuncio" component={CadastrarAnuncio} />
          <Route path="/editar-anuncio/:id" component={EditarAnuncio} />
          <Route path="/editar-anuncio-img/:id" component={EditarAnuncioimg} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
