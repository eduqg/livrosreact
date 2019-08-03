import React from 'react';
import './App.css';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from "jquery";


class App extends React.Component {

  //{/* Orientação a objetos: comportamento + estado */}
  constructor() {
    super();
    this.state = {lista: [], nome:'', email:'', password:''};
    //Em enviaForm preciso saber os dados que serão usados. 
    //Serão usados os dados do componente enviado (this)
    //this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: "http://localhost:9090/autors",
      dataType: 'json',
      //Deve inserir bind com this para associar ao state atual. 
      //Por default, no callback é utilizado o this do jquery.
      success: function (resposta) {
        //console.log("Enviado com sucesso");
        this.setState({ lista: resposta });
      }.bind(this)
    });
  }

  enviaForm(eventoDisparado){
    // Previne que o evento não continue sendo propagado pelo DOM 
    // Sem esse preventDefault ocorre um erro no post de autores
    eventoDisparado.preventDefault();
    console.log("Dados sendo enviados");
    $.ajax({
      url:'http://localhost:9090/autors',
      contentType:'application/json',
      dataType:'json',
      type:'post',
      data:JSON.stringify({nome:this.state.nome,email:this.state.email,password:this.state.password}),
      success: function(resposta){
        console.log("Enviado com sucesso");
        this.setState({ lista: resposta });
      }.bind(this),
      error: function(erro){
        console.log("Deu erro");
      }
    });
  }

  setNome(evento){
    this.setState({nome:evento.target.value})
  }

  setEmail(evento){
    this.setState({email:evento.target.value})
  }

  setPassword(evento){
    this.setState({password:evento.target.value})
  }

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
            <div className="pure-form pure-form-aligned">
              <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)} method="post" >
                <div className="pure-control-group">
                  <label htmlFor="nome">Nome</label>
                  <input id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome}  />
                </div>
                <div className="pure-control-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail}  />
                </div>
                <div className="pure-control-group">
                  <label htmlFor="password">Senha</label>
                  <input id="password" type="password" name="password" value={this.state.password} onChange={this.setPassword} />
                </div>
                <div className="pure-control-group">
                  <label></label>
                  <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                </div>
              </form>
            </div>
            <div>
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.lista.map(function (autor) {
                      return (
                        <tr key={autor.id}>
                          <td>{autor.id}</td>
                          <td>{autor.nome}</td>
                          <td>{autor.email}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

// Se exporta
export default App;
