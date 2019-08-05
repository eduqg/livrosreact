import React from 'react';
import $ from 'jquery';
import InputCustomizado from './components/InputCustomizado';
import PubSub from 'pubsub-js';

export default class AutorBox extends React.Component {
    //{/* Orientação a objetos: comportamento + estado */}
    constructor() {
        super();
        this.state = { lista: [] };
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

        //Quero me inscrever nesse tópico, quando chegar um objeto novo ativo uma função
        PubSub.subscribe('atualiza-lista-autores', function (topico, novaLista) {
            this.setState({ lista: novaLista });
        }.bind(this));
    }

    atualizaListagemAutores(novaLista) {
        this.setState({ lista: novaLista });
    }

    render() {
        return (
            <div>
                <FormularioAutor />
                <TabelaAutores lista={this.state.lista} />
            </div>
        );
    }
}

class FormularioAutor extends React.Component {

    constructor() {
        super();
        this.state = { nome: '', email: '', password: '' };
        //Em enviaForm preciso saber os dados que serão usados. 
        //Serão usados os dados do componente enviado (this)
        //this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }

    enviaForm(eventoDisparado) {
        // Previne que o evento não continue sendo propagado pelo DOM 
        // Sem esse preventDefault ocorre um erro no post de autores
        eventoDisparado.preventDefault();
        console.log("Dados sendo enviados");
        $.ajax({
            url: 'http://localhost:9090/autors',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({ nome: this.state.nome, email: this.state.email, password: this.state.password }),
            success: function (novaLista) {
                //disparar um aviso geral de novaLista disponível
                //publish and subscribe (npm install pubsub-js)
                //Publico em um tópico de interesse para quem estiver ouvindo, e conteudo
                PubSub.publish('atualiza-lista-autores', novaLista);
            },
            error: function (erro) {
                console.log("Deu erro");
            }
        });
    }

    setNome(evento) {
        this.setState({ nome: evento.target.value })
    }

    setEmail(evento) {
        this.setState({ email: evento.target.value })
    }

    setPassword(evento) {
        this.setState({ password: evento.target.value })
    }

    //A função render serve para retornar algum html para a view principal
    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)} method="post" >
                    <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome" />
                    <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email" />
                    <InputCustomizado id="password" type="password" name="password" value={this.state.password} onChange={this.setPassword} label="Senha" />
                    <div className="pure-control-group">
                        <label></label>
                        <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                    </div>
                </form>
            </div>
        );
    }
}

class TabelaAutores extends React.Component {
    render() {
        return (
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
                            this.props.lista.map(function (autor) {
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
        );
    }
}