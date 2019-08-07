// Para criar novos elementos
import React from 'react';
// Classe que cria elementos em memoria para simular DOM do navegador
import ReactDOM from 'react-dom';
import './index.css';
// Importar modulo App
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AutorBox from './Autor';
import Home from './Home';

// Posso colocar <App /> ou React.createElement(App)
ReactDOM.render(
    (<Router>
        <App>
            <Route exact path="/" component={Home} />
            <Route path="/autor" component={AutorBox} />
            <Route path="/livro" />
        </App>
    </Router>),
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
