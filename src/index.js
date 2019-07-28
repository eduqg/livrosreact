// Para criar novos elementos
import React from 'react';
// Classe que cria elementos em memoria para simular DOM do navegador
import ReactDOM from 'react-dom';
import './index.css';

// Importar modulo App
import App from './App';
import * as serviceWorker from './serviceWorker';

// Posso colocar <App /> também
ReactDOM.render(React.createElement(App), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
