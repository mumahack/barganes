import React, { Component } from 'react';

export default class ColourClash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            solved: 0,
            started: false,
            result: false,
            levelColour: 'yellow',
            wordColour: 'red',
            time: 10
        };
        this.tickTime = this.tickTime.bind(this);
        setInterval(this.tickTime, 1000);
    }

    calculateScore(solvedRounds) {
        let awesomeReward = 'Bottle of Champaign';
        let goodReward = 'Flying Hirsch';
        let mediumReward = 'Augustiner';
        let lowMediumReward = 'Oettinger Alkoholfrei';
        let badReward = 'Water';
        let reallyBadReward = 'Cab waiting outside';

        if (solvedRounds > 20) {
            return awesomeReward;
        } else if (solvedRounds > 10) {
            return goodReward;
        } else if (solvedRounds > 7) {
            return mediumReward;
        } else if (solvedRounds > 4) {
            return lowMediumReward;
        } else if (solvedRounds > 2) {
            return badReward;
        }

        return reallyBadReward;
    }

    getColorString(number) {
        let colours = ['red', 'green', 'blue', 'yellow', 'purple', 'brown'];
        return colours[number];
    }

    tickTime() {
        if (this.state.started && !this.state.result) {
            let newTime = this.state.time - 1;
            if (newTime < 0) {
                this.setState({ result: true });
            } else {
                this.setState({ time: newTime });
            }
        }
    }

    submitAnswer(isRight) {
        if (isRight) {
            let newSolved = this.state.solved + 1;
            this.setState({
                solved: newSolved,
                time: Math.round(10 - (newSolved * 0.5)),
                levelColour: this.getColorString(Math.round(Math.random() * 5)),
                wordColour: this.getColorString(Math.round(Math.random() * 5))
            });
        } else {
            this.setState({ result: true, score: this.calculateScore(this.state.solved) });
        }
    }

    generateLevel() {
        return (<div className='level'>
            <div className={'colour-text ' + this.state.levelColour}>{this.state.wordColour}</div>
            <br />
            <div className='choices'>
                <button className='colour-option' onClick={this.submitAnswer.bind(this, (this.getColorString(0) === this.state.levelColour))}>{this.getColorString(0)}</button>
                <button className='colour-option' onClick={this.submitAnswer.bind(this, (this.getColorString(1) === this.state.levelColour))}>{this.getColorString(1)}</button>
                <button className='colour-option' onClick={this.submitAnswer.bind(this, (this.getColorString(2) === this.state.levelColour))}>{this.getColorString(2)}</button>
                <br />
                <button className='colour-option' onClick={this.submitAnswer.bind(this, (this.getColorString(3) === this.state.levelColour))}>{this.getColorString(3)}</button>
                <button className='colour-option' onClick={this.submitAnswer.bind(this, (this.getColorString(4) === this.state.levelColour))}>{this.getColorString(4)}</button>
                <button className='colour-option' onClick={this.submitAnswer.bind(this, (this.getColorString(5) === this.state.levelColour))}>{this.getColorString(5)}</button>
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
                        <button className='start' onClick={() => { this.setState({ started: true }) }}>START</button>
                    </div>
                    :
                    <div>
                        <br />
                        <span className='solved'>Solved: {this.state.solved}</span>
                        <br />
                        <span className='time'>Time: {this.state.time}</span>
                        <br />
                        {(this.state.result) ?
                            <div className='result'>
                                <h2>Oh no!</h2>
                                <span>You got through {this.state.solved} rounds. You won: 1x {this.calculateScore(this.state.solved)}.
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