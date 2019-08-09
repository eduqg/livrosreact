import React from 'react';
import $ from 'jquery';
import InputCustomizado from './components/InputCustomizado';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

class FormularioLivro extends React.Component {
    constructor() {
        super();
        this.state = { titulo: '', preco: '', autorId: '' };
        this.setTitulo = this.setTitulo.bind(this);
        this.setPreco = this.setPreco.bind(this);
        this.setAutorId = this.setAutorId.bind(this);
    }

    enviaForm(evento) {
        evento.preventDefault();
        $.ajax({
            url: 'http://localhost:9090/livros',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({ titulo: this.state.titulo, preco: this.state.preco, autor_id: this.state.autorId }),
            success: function (novaLista) {
                PubSub.publish('atualiza-lista-livros', novaLista);
                this.setState({ titulo: '', preco: '', autorId: '' });
            }.bind(this),
            error: function (erro) {
                if (erro.status === 422) {
                    new TratadorErros().publicaErros(erro.responseJSON);
                }
            },
            beforeSend: function () {
                PubSub.publish('limpa-erros', {});
            }
        });
    }

    setTitulo(evento) {
        this.setState({ titulo: evento.target.value });
    }

    setPreco(evento) {
        this.setState({ preco: evento.target.value });
    }

    setAutorId(evento) {
        this.setState({ autorId: evento.target.value });
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)} method="post" >
                    <InputCustomizado id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.setTitulo} label="Título" />
                    <InputCustomizado id="preco" type="text" name="preco" value={this.state.preco} onChange={this.setPreco} label="Preco" />
                    <div className="pure-control-group">
                        <label htmlFor="autorId">Autor</label>
                        <select value={this.state.autorId} className="autorId" id="autorId" onChange={this.setAutorId} >
                            <option value="">Selecione um autor</option>
                            {
                                this.props.autores.map(function (autor) {
                                    return <option value={autor.id} key={autor.id}>{autor.nome}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="pure-control-group">
                        <label></label>
                        <button type="submit" className="pure-button pure-button-primary">Salvar</button>
                    </div>
                </form>
            </div>
        );
    }
}

class TabelaLivros extends React.Component {
    render() {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Titulo</th>
                            <th>Preco</th>
                            <th>Autor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(function (livro) {
                                return (
                                    <tr key={livro.id}>
                                        <td>{livro.id}</td>
                                        <td>{livro.titulo}</td>
                                        <td>{livro.preco} R$</td>
                                        <td>{livro.autor_name}</td>
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

export default class LivroBox extends React.Component {
    constructor() {
        super();
        this.state = { lista: [], autores: [] };
    }

    componentDidMount() {
        $.ajax({
            url: "http://localhost:9090/livros",
            dataType: 'json',
            success: function (resposta) {
                this.setState({ lista: resposta });
            }.bind(this)
        });

        $.ajax({
            url: "http://localhost:9090/autors",
            dataType: 'json',
            success: function (resposta) {
                this.setState({ autores: resposta });
            }.bind(this)
        });

        PubSub.subscribe('atualiza-lista-livros', function (topico, novaLista) {
            this.setState({ lista: novaLista });
        }.bind(this));
    }

    atualizaListagemLivros(novaLista) {
        this.setState({ lista: novaLista });
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de Livros</h1>
                </div>

                <div className="content" id="content">
                    <FormularioLivro autores={this.state.autores} />
                    <TabelaLivros lista={this.state.lista} />
                </div>
            </div>
        );
    }
}