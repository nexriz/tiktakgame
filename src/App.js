import React, { Component } from 'react';
import './app.css'

class App extends Component {
  state = {
    game: [
      null, null, null,
      null, null, null,
      null, null, null
    ],
    myTurn: true,
    winner: null,
    winning: [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
  }
  clickMove({ index }) {
    const { myTurn, game, winner } = this.state;
    if(game[index] === 'X' || game[index] === 'O') return;

    if(!winner){
      const newGame = game;
        newGame[index] = myTurn ? 'X' : 'O';
        this.setState({
          game: newGame,
          myTurn: !this.state.myTurn
        })
      }
    this.checkState();
  }
  checkState() {
    const { winning, game } = this.state;
    winning.forEach(item => {
      if(game[item[0]] === 'X' && game[item[1]] === 'X' && game[item[2]] === 'X') this.setState({winner: 'X'});
      if(game[item[0]] === 'O' && game[item[1]] === 'O' && game[item[2]] === 'O') this.setState({winner: 'O'});
    })
  }
  resetGame() {
    this.setState({
    game: [
      null, null, null,
      null, null, null,
      null, null, null
    ],
    myTurn: true,
    winner: null,
    }) 
  }
  render() {
    const { winner } = this.state;
    return (
      <div>
          <Tiktak {...this.state} click={::this.clickMove}/>
          <hr/>
          <h1 style={{paddingLeft: '25px', color: 'coral', textShadow: '1px 1px 1px black'}}>Winner: {winner && winner + '!'}</h1>
          {winner && <button className="reset-btn" onClick={::this.resetGame}>reset</button>}
      </div>
    );
  }
}


const Tiktak = ({ game, click }) => {
  return (
    <div className="parent">
      {game.map((item, index) => <div key={index} onClick={(e) => click({e, index})} className="item">{item}</div>)}
    </div>
  )
}

export default App;
