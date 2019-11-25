import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { logos } from './image';
import { success, failure } from './message';
import './App.css';
import Win from './assets/win.gif';
import gameOver from './assets/game-over.gif';
import Life from './assets/life.png';

const baseRandom = (lower, upper) => {
  const nativeFloor = Math.floor;
  const nativeRandom = Math.random;
  return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
};

const randomImage = () => {
  return logos[baseRandom(0, logos.length - 1)];
};

const App = () => {

  const [data, setData] = useState({
    image: logos[baseRandom(0, logos.length - 1)],
    status: 0,
    life: 3,
    points: 0,
    input: '',
  });

  const nextStep = (e, status) => {

    const sharedState = {
      life: status === -1 ? data.life - 1 : data.life,
      input: '',
      points: status === 1 ? data.points + 1 : data.points,
    };

    // define correct or wrong answer
    setData({
      ...data,
      ...sharedState,
      status: status,
    });

    // after one second generate another image
    setTimeout(() => {
      // delete the correct answer from the data bank
      status === 1 && logos.splice(logos.findIndex(obj => obj.name === data.image.name), 1);

      setData({
        ...data,
        ...sharedState,
        image: randomImage(),
        status: 0
      });
    }, 1000);
  };

  const checkValue = (e) => {
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

      if (data.input.toLowerCase().match(data.image.name, 'g')) {
        nextStep(e, 1);
      } else {
        nextStep(e, -1);
      }
    }
  };

  const lifeCounter = () => {
    let i = 0;
    let currentLives = [];
    for (i; i < data.life; i++) {
      currentLives.push(<img key={ i } className="health__life" width="40px" src={Life} alt="life" />)
    }

    let d = 0;
    let lostLives = [];
    for (d; d < Math.abs(data.life - 3); d++) {
      lostLives.push(<img key={ d } className="health__life" style={{ opacity: "0.3" }} width="40px" src={Life} alt="life" />)
    }

    return [
      currentLives,
      lostLives
    ];
  };

  return (
      <div className="app">
        {logos.length !== 0 && data.life !== 0 &&
          <div className="game">
            <div className={data.status === 0 ? 'message message--state-default' : data.status === 1 ? "message message--state-success" : "message message--state-failure"}>
              {data.status === 0 &&
                <span>What is it?</span>
              }
              {data.status === 1 &&
                <span>{success[baseRandom(0, 10)]}</span>
              }
              {data.status === -1 &&
                <span>{failure[baseRandom(0, 5)]}</span>
              }
            </div>
            <div className="random-image">
              <LazyLoadImage
                  effect="blur"
                  key={data.status === 1 ? data.image.main : data.image.placeholder}
                  alt="programming language logo"
                  className="random-image__element"
                  src={data.status === 1 ? data.image.main : data.image.placeholder}
              />
            </div>
            <input
                className="input"
                type="text"
                onChange={(e) => setData({ ...data, input: e.target.value })}
                onKeyDown={(e) => checkValue(e)}
                autoComplete="off"
                name="language"
                value={ data.input }
                autoFocus
            />
          </div>
        }
        {logos.length === 0 &&
            <div className="game">
              <div className="random-image">
                <LazyLoadImage effect="blur" className="random-image__element" src={Win} alt="win" />
              </div>
              <div className="game__ending">
                <p>Total points: <span className="game__ending__score">{data.points}</span></p>
                <p>Remaining life: <span className="game__ending__score">{data.life}</span></p>
                <p><span className="game__ending__retry" onClick={() => window.location.reload()}> Retry? </span></p>
              </div>
            </div>
        }
        {data.life === 0 &&
          <div className="game">
            <div className="random-image">
              <LazyLoadImage effect="blur" className="random-image__element" src={gameOver} alt="Game Over" />
            </div>
            <div className="game__ending">
              <p>Total points: <span className="game__ending__score">{data.points}</span></p>
              <p>Remaining life: <span className="game__ending__score">{data.life}</span></p>
              <p><span className="game__ending__retry" onClick={() => window.location.reload()}> Retry? </span></p>
            </div>
          </div>
        }
        <div className="health">
          {lifeCounter()}
        </div>
      </div>
    );
};

export default App;
