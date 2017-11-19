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
        return time;
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
            <div>
                <button onClick={() => { this.props.submit(0) }} >Back to </button>
                {(results) ?
                    <div>
                        {(results === 'fail') ?
                            <span><h2>YOU FAILED!</h2><br />Better luck next time!</span>
                            :
                            <span><h2>YOU GOT IT!</h2><br />Your reaction time: {results}<br /><br /><button onClick={() => { this.props.submit(this.calculateScore(results)) }}>ADD TO SCORE</button></span>
                        }
                    </div>
                    :
                    <div>
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
                        {(ready) ? <button className='btn-success'>READY</button> : <button className="btn-danger">NOT READY</button>}
                        {(this.state.debug) &&
                            <div>
                                <h2>Schrottbutton-Events:</h2>
                                <ul>
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