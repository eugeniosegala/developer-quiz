import React, { Component } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { logos } from './image';
import { success, failure } from './message';
import './App.css';
import Win from './assets/win.gif';
import gameOver from './assets/game-over.gif';
import Life from './assets/life.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: {},
      status: 0,
      life: 3,
      points: 0
    }
  }

  baseRandom = (lower, upper) => {
    const nativeFloor = Math.floor;
    const nativeRandom = Math.random;
    return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
  };

  randomImage = () => {
    return logos[this.baseRandom(0, logos.length - 1)];
  };

  componentDidMount() {
    this.setState({
      image: this.randomImage(),
    })
  }

  nextStep(e, status) {
    // reset the input
    e.target.value = "";
    // define correct or wrong answer
    this.setState({
      status: status,
      points: status === 1 ? this.state.points + 1 : this.state.points,
      life: status === -1 ? this.state.life - 1 : this.state.life
    });
    // after one second generate another image
    setTimeout(() => {
      // delete the correct answer from the data bank
      status === 1 && logos.splice(logos.findIndex(obj => obj.name === this.state.image.name), 1);
      this.setState({
        image: this.randomImage(),
        status: 0
      });
    }, 1000);
  }

  checkValue = (e) => {
    if (e.keyCode === 13) {
      if( navigator.userAgent.match(/Android/i)
          || navigator.userAgent.match(/webOS/i)
          || navigator.userAgent.match(/iPhone/i)
          || navigator.userAgent.match(/iPad/i)
          || navigator.userAgent.match(/iPod/i)
          || navigator.userAgent.match(/BlackBerry/i)
      ) {
        e.target.blur();
      }
      // if (e.target.value === this.state.image.name) {
      if (e.target.value.match(this.state.image.name, 'g')) {
        // delete the correct answer from the data bank
        this.nextStep(e, 1);
      } else {
        this.nextStep(e, -1);
      }
    }
  };

  lifeCounter = () => {
    let i = 0;
    let currentLives = [];
    for (i; i < this.state.life; i++) {
      currentLives.push(<img key={ i } className="health__life" width="40px" src={Life} alt="life" />)
    }

    let d = 0;
    let lostLives = [];
    for (d; d < Math.abs(this.state.life - 3); d++) {
      lostLives.push(<img key={ d } className="health__life" style={{ opacity: "0.3" }} width="40px" src={Life} alt="life" />)
    }

    return [
      currentLives,
      lostLives
    ];
  };

  render() {
    const { image, status, life, points } = this.state;

    return (
      <div className="app">
        {logos.length !== 0 && life !== 0 &&
          <div className="game">
            <div className={status === 0 ? 'message message--state-default' : status === 1 ? "message message--state-success" : "message message--state-failure"}>
              {status === 0 &&
                <span>What is it?</span>
              }
              {status === 1 &&
                <span>{success[this.baseRandom(0, 10)]}</span>
              }
              {status === -1 &&
                <span>{failure[this.baseRandom(0, 5)]}</span>
              }
            </div>
            <div className="random-image">
              <LazyLoadImage effect="blur" key={status === 1 ? image.main : image.placeholder} alt="game" className="random-image__element" src={status === 1 ? image.main : image.placeholder} />
            </div>
            <input className="input" autoFocus type="text" onKeyDown={(e) => this.checkValue(e)} autoComplete="off" name="language"/>
          </div>
        }
        {logos.length === 0 &&
            <div className="game">
              <div className="random-image">
                <LazyLoadImage effect="blur" className="random-image__element" src={Win} alt="win" />
              </div>
              <div className="game__ending">
                <p>Total points: <span className="game__ending__score">{points}</span></p>
                <p>Remaining life: <span className="game__ending__score">{life}</span></p>
                <p><span className="game__ending__retry" onClick={() => window.location.reload()}> Retry? </span></p>
              </div>
            </div>
        }
        {life === 0 &&
          <div className="game">
            <div className="random-image">
              <LazyLoadImage effect="blur" className="random-image__element" src={gameOver} alt="Game Over" />
            </div>
            <div className="game__ending">
              <p>Total points: <span className="game__ending__score">{points}</span></p>
              <p>Remaining life: <span className="game__ending__score">{life}</span></p>
              <p><span className="game__ending__retry" onClick={() => window.location.reload()}> Retry? </span></p>
            </div>
          </div>
        }
        <div className="health">
          {this.lifeCounter()}
        </div>
      </div>
    );
  }
}

export default App;
