import React, { useState, useRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { logos } from './image';
import { success, failure } from './message';
import './App.css';
import Win from './assets/win.gif';
import gameOver from './assets/game-over.gif';
import Life from './assets/life.png';

const mobileDetection = () => {
  return navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
};

const baseRandom = (lower, upper) => {
  const nativeFloor = Math.floor;
  const nativeRandom = Math.random;
  return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
};

const randomImage = () => {
  return logos[baseRandom(0, logos.length - 1)];
};

const App = () => {

  const inputEl = useRef(null);

  const [data, setData] = useState({
    image: logos[baseRandom(0, logos.length - 1)],
    status: 0,
    lives: 3,
    points: 0,
    input: '',
  });

  const nextStep = (e, status) => {

    const sharedState = {
      lives: status === -1 ? data.lives - 1 : data.lives,
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

      // delete the correct answer from the data object
      status === 1 && logos.splice(logos.findIndex(obj => obj.name === data.image.name), 1);

      setData({
        ...data,
        ...sharedState,
        image: randomImage(),
        status: 0
      });

      if (inputEl.current) {
        if (mobileDetection()) {
          inputEl.current.blur();
        } else {
          inputEl.current.focus();
        }
      }
    }, 1000);
  };

  const checkValue = (e) => {
    if (e.keyCode === 13) {
      if (inputEl.current) {
        if (mobileDetection()) {
          inputEl.current.blur();
        }
      }
      nextStep(e, data.input.toLowerCase().replace(/ /g,'').match(data.image.name, 'g') ? 1 : -1);
    }
  };

  const livesCounter = () => {
    let i = 0;
    let currentLives = [];
    for (i; i < data.lives; i++) {
      currentLives.push(<img key={ i } className="health__life" width="40px" src={Life} alt="life" />)
    }

    let d = 0;
    let lostLives = [];
    for (d; d < Math.abs(data.lives - 3); d++) {
      lostLives.push(<img key={ d } className="health__life" style={{ opacity: "0.3" }} width="40px" src={Life} alt="life" />)
    }

    return [
      currentLives,
      lostLives
    ];
  };

  return (
      <div className="app">
        {(data.status === 1 || data.status === -1) &&
          <div className={ data.status === 1 ? "message message--state-success" : "message message--state-failure"} >
            {data.status === 1 ? <span>{success[baseRandom(0, 10)]}</span> : <span>{failure[baseRandom(0, 5)]}</span>}
          </div>
        }
        {(logos.length !== 0 && data.lives !== 0) &&
          <div className="game">
            {data.status === 0 &&
              <div className="message message--state-default">
                <span>What is it?</span>
              </div>
            }
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
                ref={inputEl}
                className="input"
                type="text"
                onChange={(e) => setData({ ...data, input: e.target.value })}
                onKeyDown={(e) => checkValue(e)}
                autoComplete="off"
                name="language"
                value={ data.input }
                autoFocus={ !mobileDetection() }
                disabled={ data.status !== 0 }
            />
          </div>
        }
        {(logos.length === 0 || data.lives === 0) &&
            <div className="game">
              <div className="random-image">
                {logos.length === 0 ?
                  <LazyLoadImage effect="blur" className="random-image__element" src={Win} alt="win"/>
                  :
                  <LazyLoadImage effect="blur" className="random-image__element" src={gameOver} alt="win"/>
                }
              </div>
              <div className="game__ending">
                <p>Score: <span className="game__ending__score">{data.points}</span></p>
                <p>Lives: <span className="game__ending__score">{data.lives}</span></p>
                <p><span className="game__ending__retry" onClick={() => window.location.reload()}> Retry? </span></p>
              </div>
            </div>
        }
        <div className="health">
          {livesCounter()}
        </div>
      </div>
    );
};

export default App;
