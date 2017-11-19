import React, { Component } from 'react';
import './App.css';
import Schrottbutton from './games/Schrottbutton';
import ColourClash from './games/ColourClash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: 'none',
      order: []
    }
    this.submitScore = this.submitScore.bind(this)
  }

  submitScore(score) {
    let newScore = this.state.order;
    if (newScore[score]) {
    newScore[score] = newScore[score] + 1;
    } else {
      newScore[score] = 1;
    }
    this.setState({ game: 'none', order: newScore });
  }

  render() {
    return (
      <div className="App">
        {(this.state.game === 'none') &&
          <div className='main-menu'>
            <h3>SCORE:</h3>{
              Object.keys(this.state.order).map((order) => {return (<div className='order'>{order + ': ' + this.state.order[order]}<br/></div>)})
            }
            <br />
            <br />
            <br />
            <button onClick={() => { this.setState({ game: 'schrottbutton' }) }}>Start 'Schrottbutton'</button>
            <hr />
            <button onClick={() => { this.setState({ game: 'colourClash' }) }}>Start 'ColourClash'</button>
          </div>
        }
        {(this.state.game === 'schrottbutton') &&
          <Schrottbutton submit={this.submitScore} />
        }
        {(this.state.game === 'colourClash') &&
          <ColourClash submit={this.submitScore} />
        }
      </div>
    );
  }
}

export default App
