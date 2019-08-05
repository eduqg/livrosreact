import React from 'react';
import './App.css';
import './css/pure-min.css';
import './css/side-menu.css';
import AutorBox from './Autor';

class App extends React.Component {
  render() {
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
        </a>
        {/* Exemplo de Comentário */}
        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="localhost:3000">U can do it!</a>
            <ul className="pure-menu-list">
              <li className="pure-menu-item"><a href="localhost:3000" className="pure-menu-link">Home</a></li>
              <li className="pure-menu-item"><a href="localhost:3000" className="pure-menu-link">Autor</a></li>
              <li className="pure-menu-item"><a href="localhost:3000" className="pure-menu-link">Livro</a></li>
            </ul>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Cadastro de Autores</h1>
            <h2>Go go Edu!!!</h2>
          </div>

          <div className="content" id="content">
            {/*Junta meus dois componentes de Formulario e Lista de Autores*/}
            {/* Criar Box no react se chama High Order Component */}
            <AutorBox />
          </div>
        </div>
      </div>
    );
  }
}

// Se exporta
export default App;
