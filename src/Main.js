import React, { Component } from 'react';
import './App.css';
import Schrottbutton from './games/Schrottbutton';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: 'none',
      points: 0
    }
    this.submitScore = this.submitScore.bind(this)
  }

  submitScore(score) {
    this.setState({ game: 'none', points: this.state.points + score });
  }

  render() {
    return (
      <div className="App">
        {(this.state.game === 'none') &&
          <div>
            <h3>SCORE:</h3>{this.state.score || 0}
            <br />
            <br />
            <br />
            <button onClick={() => { this.setState({ game: 'schrottbutton' }) }}>Start 'Schrottbutton'</button>
          </div>
        }
        {(this.state.game === 'schrottbutton') &&
          <Schrottbutton submit={this.submitScore} />
        }
      </div>
    );
  }
}

export default App
