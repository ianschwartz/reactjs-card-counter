import React, { Component } from 'react';
import './App.css';

class Game extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

function Count(props) {
  if (props.shouldDisplay) {
    return <React.Fragment>{props.count}</React.Fragment>
  } else {
    return <React.Fragment>Hover to Display Count</React.Fragment>
  }
}

class CountContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldDisplay: false,
    }
  }
  mouseEnter() {
    this.setState({shouldDisplay: true});
  }
  mouseOut() {
    this.setState({shouldDisplay: false});
  }
  render() {
    let countStyle = {
      display: "block",
      position: "absolute",
      left: "50%",
      bottom: "0",
      transform: "translate(-50%, -50%)",
      margin: "0 auto",
      height: "50px",
    }
    return <div className="btn" style={countStyle} onMouseEnter={() => this.mouseEnter()} onMouseOut={() => this.mouseOut()} onTouchStart={() => this.mouseEnter()} onTouchEnd={() => this.mouseOut()}>
      <Count count={this.props.count} shouldDisplay={this.state.shouldDisplay} />
    </div>
  }
}

class Muck extends Component {
  render() {
    let muckStyle = {
      listStyle: "none",
      fontSize: "2rem",
      width: "300px",
      margin: "auto",
      background: "blue"
    }
    let muckLiStyle = {
      display: "inline-block",
    }
    return (
      <ul style={muckStyle}>
        {this.props.cards.map((card, id) => {
          return <li style={muckLiStyle} key={id}><Card card={card}/></li>})
        }
      </ul>
    )
  }
}

class ActiveCard extends Component {
  render() {
    let activeCardStyle = {
      fontSize: "10rem",
      textAlign: "center"
    }
    return (
      <div style={activeCardStyle}><Card card={this.props.card} /></div>
    )
  }
}

class Button extends Component {
  render() {
    return (
      <div className="btn" onClick={this.props.action}>{this.props.children}</div>
    )
  }
}

class Card extends Component {
  render() {
    function determineColor(card) {
      if (card.suit === ("H" || "D")) {
        return "red";
      } else {
        return "black";
      }
    }

    let cardStyle = {
      color: determineColor(this.props.card),
    }
    return (
      <span style={cardStyle}>{this.props.card.unicode}</span>
    )
  }
}

class Modal extends Component {
  render() {
    function shouldDisplay(bool) {
      if (bool) {
        return "block";
      } else {
        return "none";
      }
    }
    let modalStyle = {
      display: shouldDisplay(this.props.shouldDisplay),
    }
    return (
      <div style={modalStyle} className="modal">
        {this.props.children}
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeCard: {rank: "0", suit: "0", value: 0, unicode: "🂠"},
      dealtCards: [],
      showRules: false
    };
  }

  count() {
      return this.state.dealtCards.reduce((accumulator, card) => {
        return accumulator + card.value;
      }, 0);
  }

  dealCard() {
    const cards = [
      {rank: "A", suit: "C", value: -1, unicode: "🃑"},
      {rank: "A", suit: "S", value: -1, unicode: "🂡"},
      {rank: "A", suit: "D", value: -1, unicode: "🃁"},
      {rank: "A", suit: "H", value: -1, unicode: "🂱"},
      {rank: "K", suit: "C", value: -1, unicode: "🃞"},
      {rank: "K", suit: "S", value: -1, unicode: "🂮"},
      {rank: "K", suit: "D", value: -1, unicode: "🃎"},
      {rank: "K", suit: "H", value: -1, unicode: "🂾"},
      {rank: "Q", suit: "C", value: -1, unicode: "🃝"},
      {rank: "Q", suit: "S", value: -1, unicode: "🂭"},
      {rank: "Q", suit: "D", value: -1, unicode: "🃍"},
      {rank: "Q", suit: "H", value: -1, unicode: "🂽"},
      {rank: "J", suit: "C", value: -1, unicode: "🃛"},
      {rank: "J", suit: "S", value: -1, unicode: "🂫 "},
      {rank: "J", suit: "D", value: -1, unicode: "🃋"},
      {rank: "J", suit: "H", value: -1, unicode: "🂻"},
      {rank: "10", suit: "C", value: -1, unicode: "🃚"},
      {rank: "10", suit: "S", value: -1, unicode: "🂪"},
      {rank: "10", suit: "D", value: -1, unicode: "🃊"},
      {rank: "10", suit: "H", value: -1, unicode: "🂺"},
      {rank: "9", suit: "C", value: 0, unicode: "🃙"},
      {rank: "9", suit: "S", value: 0, unicode: "🂩"},
      {rank: "9", suit: "D", value: 0, unicode: "🃉"},
      {rank: "9", suit: "H", value: 0, unicode: "🂹"},
      {rank: "8", suit: "C", value: 0, unicode: "🃘"},
      {rank: "8", suit: "S", value: 0, unicode: "🂨"},
      {rank: "8", suit: "D", value: 0, unicode: "🃈"},
      {rank: "8", suit: "H", value: 0, unicode: "🂸"},
      {rank: "7", suit: "C", value: 0, unicode: "🃗"},
      {rank: "7", suit: "S", value: 0, unicode: "🂧"},
      {rank: "7", suit: "D", value: 0, unicode: "🃇"},
      {rank: "7", suit: "H", value: 0, unicode: "🂸"},
      {rank: "6", suit: "C", value: 1, unicode: "🃖"},
      {rank: "6", suit: "S", value: 1, unicode: "🂦"},
      {rank: "6", suit: "D", value: 1, unicode: "🃆"},
      {rank: "6", suit: "H", value: 1, unicode: "🂶"},
      {rank: "5", suit: "C", value: 1, unicode: "🃕"},
      {rank: "5", suit: "S", value: 1, unicode: "🂥"},
      {rank: "5", suit: "D", value: 1, unicode: "🂵"},
      {rank: "5", suit: "H", value: 1, unicode: "🃅"},
      {rank: "4", suit: "C", value: 1, unicode: "🃔"},
      {rank: "4", suit: "S", value: 1, unicode: "🂤"},
      {rank: "4", suit: "D", value: 1, unicode: "🃄"},
      {rank: "4", suit: "H", value: 1, unicode: "🂴"},
      {rank: "3", suit: "C", value: 1, unicode: "🃓"},
      {rank: "3", suit: "S", value: 1, unicode: "🂣"},
      {rank: "3", suit: "D", value: 1, unicode: "🃃"},
      {rank: "3", suit: "H", value: 1, unicode: "🂳"},
      {rank: "2", suit: "C", value: 1, unicode: "🃒"},
      {rank: "2", suit: "S", value: 1, unicode: "🂢"},
      {rank: "2", suit: "D", value: 1, unicode: "🃂"},
      {rank: "2", suit: "H", value: 1, unicode: "🂲"},
    ];
    let card = cards[Math.floor(Math.random()*52)];
    this.setState((previousState) => {
      return {
        activeCard: card,
        dealtCards: [card, ...previousState.dealtCards]
      };
    })
  }

  toggleRules() {
    this.setState((previousState) => {
      return {
        showRules: !previousState.showRules
      };
    })
  }

  render() {
    return (
      <div className="App">
        <Game>
          <ActiveCard card={this.state.activeCard} />
          <Button action={this.dealCard.bind(this)}>deal Card</Button>
        </Game>
        <Button action={this.toggleRules.bind(this)}>How To Play</Button>
        <CountContainer count={this.count()} />
        <Modal shouldDisplay={this.state.showRules}>
          <h2>How to Count Cards</h2>
          <p>
            This game uses Hi-Lo, the most common card counting system, the card values are as follows:
          </p>

          <ul>
            <li>2-6 = +1</li>
            <li>7-9 = 0</li>
            <li>10-Ace= -1</li>
          </ul>

          <p>As each card is dealt, you will either add 1, subtract 1, or do nothing based on each card’s value. This app does not cover betting strategy, but exists to train you to count fast. It sounds easy, but there is a lot happening in a casino.</p>
          <Button action={this.toggleRules.bind(this)}>Close</Button>

        </Modal>
      </div>
    );
  };
}

export default App;
