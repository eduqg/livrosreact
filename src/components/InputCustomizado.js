import React from 'react';
import PubSub from 'pubsub-js';

export default class InputCustomizado extends React.Component {

    constructor() {
        super();
        this.state = { msgErro: '' };
    }

    render() {
        //Props guarda todos os parametros que foram enviados para esse componente.
        // Spread operator (...) no JSX é usado também para repassar todos os parametros
        // Ou seja, "spread", quero espalhar todas as informações que foram passadas para esse componente em
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input {...this.props} />
                <span className="ccsdoerro">{this.state.msgErro}</span>
            </div>
        );
    }

    // Função chamada no react assim que meu componente é exibido
    // Usado quando necessita de manipulação, por exmeplo com ajax
    componentDidMount() {
        PubSub.subscribe("erro-validacao-autor", function (topico, erro) {
            if (erro.field === this.props.name) {
                this.setState({ msgErro: erro });
            }
        }.bind(this));

        PubSub.subscribe("limpa-erros", function (topico) {
            this.setState({ msgErro: '' });
        }.bind(this));
    }
}