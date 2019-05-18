import React, { Component } from 'react';
import Square from './Square';

class Board extends Component{
    render = () => {
        return (     
        <div>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            <br/>
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            <br />
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
        </div>
        )
    }

    renderSquare = (i) => (
        <Square 
            value= {this.props.squares[i]} 
            onClick = {() => this.props.onClick(i)}
        />
    )
}

export default Board