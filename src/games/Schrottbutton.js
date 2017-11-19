import { subscribe } from 'mqtt-react';
import React, { Component } from 'react';

class Schrottbutton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            debug: false
        }
    }

    calculateScore(time) {
        return Math.round(100000 / Number(time));
    }

    render() {
        let ready = false
        let results = false
        this.props.data.forEach((event) => {
            if (event === 'ready') {
                ready = true;
            } else {
                results = event;
            }
        });

        return (
            <div key='schrottbutton' className='game schrottbutton'>
                <button onClick={() => { this.props.submit(0) }} >Back to Menu</button>
                {(results) ?
                    <div className='results'>
                        {(results === 'fail') ?
                            <span className='fail'><h2>YOU FAILED!</h2><br />Better luck next time!<button onClick={() => { this.props.submit(0) }} >Back to Menu</button></span>
                            :
                            <span className='success'><h2>YOU GOT IT!</h2><br />Your reaction time: {results}<br /><br /><button onClick={() => { this.props.submit(this.calculateScore(results)) }}>ADD TO SCORE</button></span>
                        }
                    </div>
                    :
                    <div className='intro'>
                        <h1>Schrottbutton</h1>
                        <span>How to play "Schrottbutton":</span>
                        <ul>
                            <li>Connect the "Schrottbutton" to a power source</li>
                            <li>Wait for the button underneath to turn green and say "READY"</li>
                            <li>Pass the Button to the first player</li>
                            <li>Tell him to press the button as soon as the light turns red</li>
                            <li>The app will display the score</li>
                            <li>Dis- and Reconnect the button for the next player</li>
                            <li>See the overall score in the main Menu</li>
                        </ul>
                        {(ready) ? <button className='ready btn-success'>READY</button> : <button className="not-ready btn-danger">NOT READY</button>}
                        {(this.state.debug) &&
                            <div className='debugger'>
                                <h2>Schrottbutton-Events:</h2>
                                <ul className='events'>
                                    {this.props.data.map(message => <li>{message}</li>)}
                                </ul>
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}

export default subscribe({
    topic: 'mumalab/games/schrottbutton'
})(Schrottbutton)