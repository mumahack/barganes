import React, { Component } from 'react';

export default class ColourClash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            solved: 0,
            started: false,
            result: false
        }
    }

    calculateScore(solvedRounds) {
        return solvedRounds * 50;
    }

    getColorString(number) {
        let colours = ['red', 'green', 'blue', 'yellow', 'purple', 'brown'];
        return colours[number];
    }

    submitAnswer(isRight) {
        if (isRight) {
            let newSolved = this.state.solved + 1;
            this.setState({solved: newSolved});
        } else {
            this.setState({result: true, score: this.calculateScore(this.state.solved)});
        }
    }

    generateLevel() {
        let levelColour = this.getColorString(Math.round(Math.random() * 5));

        return (<div className='level'>
            <div className={'colour-text ' + levelColour}>{this.getColorString(Math.round(Math.random() * 5))}</div>
            <br />
            <div className='choices'>
                <button className='colour-option' onClick={this.submitAnswer.bind(this, (this.getColorString(0) === levelColour))}>{this.getColorString(0)}</button>
                <button className='colour-option' onClick={this.submitAnswer.bind(this, (this.getColorString(1) === levelColour))}>{this.getColorString(1)}</button>
                <button className='colour-option' onClick={this.submitAnswer.bind(this, (this.getColorString(2) === levelColour))}>{this.getColorString(2)}</button>
                <br />
                <button className='colour-option' onClick={this.submitAnswer.bind(this, (this.getColorString(3) === levelColour))}>{this.getColorString(3)}</button>
                <button className='colour-option' onClick={this.submitAnswer.bind(this, (this.getColorString(4) === levelColour))}>{this.getColorString(4)}</button>
                <button className='colour-option' onClick={this.submitAnswer.bind(this, (this.getColorString(5) === levelColour))}>{this.getColorString(5)}</button>
            </div>
        </div>);
    }

    render() {
        return (
            <div className='game colour-clash'>
                <button onClick={() => { this.props.submit(0) }} >Back to Menu</button>
                <h1>ColourClash</h1>
                {(!this.state.started) ?
                <div className='intro'>
                    <span>How to play "ColourClash":</span>
                        <ul>
                            <li>You will see the name of a colour written in a diffrent colour.</li>
                            <li>The goal is to press the right button corresponding to the colour of the written word.</li>
                            <li>The game will end once the timer runs out or you choose the wrong option</li>
                        </ul>
                        <button className='start' onClick={() => {this.setState({started: true})}}>START</button>
                </div>
                :
                <div>
                <br />
                <span className='solved'>Solved: {this.state.solved}</span>
                <br />
                {(this.state.result) ?
                    <div className='result'>
                        <h2>Oh no!</h2>
                        <span>You got through {this.state.solved} rounds. {this.state.score} Points will be added to your score.
                <br />
                            <button onClick={() => { this.props.submit(this.state.score) }}>ADD TO SCORE</button>
                        </span>
                    </div>
                    :
                    this.generateLevel()
                }
                </div>
                }
            </div>
        );
    }
}