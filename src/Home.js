import React from 'react';

export default class Home extends React.Component {
    render() {
        return (
            <div> {/*JSX suporta XML como parte da linguagem, só tem um pai */}
                <div className="header">
                    <h1>Bem vindo!</h1>
                    <h2>Go go Edu!!!</h2>
                </div>
                <div className="content" id="content">
                </div>
            </div>
        );
    }
}