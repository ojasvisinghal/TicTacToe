import React, { Component } from 'react';
import Board from './Board';
import './game.css';

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [{
                square: Array(9).fill(null)
            }],
            xIsNext: true
        }
    }
    handleSquare = (i) => {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.square.slice();
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history : history.concat([{
                square : squares
            }]),
            xIsNext: !this.state.xIsNext
        })
    }
    calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }
    reset = () => {
        const history = [{
            square : Array(9).fill(null)
        }]
        this.setState({
            history : history,
            xIsNext: true
        })
    }
    undo = () => {
        const history = this.state.history;
        if(history.length === 1) return;
        const current = history[history.length - 2];
        const squares = current.square.slice();
        this.setState({
            history : history.concat([{
                square : squares
            }]),
            xIsNext: !this.state.xIsNext
        })
    }
    render = () => {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = this.calculateWinner(current.square);
        let status
        if (winner) {
            status = 'Winner : ' + winner;
        } else {
            status = 'Next Turn : ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div>
                <button 
                    className = "button"
                    onClick = {() => this.reset()}
                > Reset
                </button>
                <button 
                    className = "button"
                    onClick = {() => this.undo()}
                > Undo
                </button>
                <h1>{status}</h1> 
                <Board 
                    squares={current.square} 
                    onClick={(i) => this.handleSquare(i)}
                />
            </div>
        )
    }
}

export default Game