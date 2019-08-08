import React from 'react';
import $ from 'jquery';
import InputCustomizado from './components/InputCustomizado';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

class FormularioAutor extends React.Component {

    constructor() {
        super();
        this.state = { nome: '', email: '', password: '' };
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
                //Atualiza campos para branco
                //Se uso setState, uso bind(this) para não associar ao this do react
                this.setState({ nome: '', email: '', password: '' });
            }.bind(this),
            error: function (erro) {
                if (erro.status === 422) {
                    new TratadorErros().publicaErros(erro.responseJSON);
                }
            },
            beforeSend: function () {
                PubSub.publish("limpa-erros", {});
            }
        });
    }

    salvaAlteracao(nomeInput, evento) {
       //Opção 1
        this.setState({[nomeInput]:evento.target.value})
        
        //Opção 2
        //var campo = {};
        //campo[nomeInput] = evento.target.value;
        //this.setState(campo);
    }

    //A função render serve para retornar algum html para a view principal
    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)} method="post" >
                    <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.salvaAlteracao.bind(this,'nome')} label="Nome" />
                    <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.salvaAlteracao.bind(this,'email')} label="Email" />
                    <InputCustomizado id="password" type="password" name="password" value={this.state.password} onChange={this.salvaAlteracao.bind(this,'password')} label="Senha" />
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
                <div className="header">
                    <h1>Cadastro de Autores</h1>
                </div>

                <div className="content" id="content">
                    {/*Junta meus dois componentes de Formulario e Lista de Autores*/}
                    {/* Criar <AutorBox /> Box no react se chama High Order Component */}
                    <FormularioAutor />
                    <TabelaAutores lista={this.state.lista} />
                </div>
            </div>
        );
    }
}