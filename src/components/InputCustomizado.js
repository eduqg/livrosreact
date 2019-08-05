import React from 'react';

export default class InputCustomizado extends React.Component {
    render() {
        //Props guarda todos os parametros que foram enviados para esse componente.
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input id={this.props.id} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.onChange} />
            </div>
        );
    }
}