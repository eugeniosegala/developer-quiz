import React, { useState, useRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import './App.css';
import { logos } from './image';
import { success, failure } from './message';
import Win from './assets/win.gif';
import gameOver from './assets/game-over.gif';
import Life from './assets/life.png';
import Loader from './assets/loader.jpg';

const INITIAL_LIVES = 3;

const handleDeviceDetection = () => {
  return navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
};

const getRandomNumBetween = (lower, upper) => {
  const nativeFloor = Math.floor;
  const nativeRandom = Math.random;
  return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
};

const getRandomImage = () => {
  return logos[getRandomNumBetween(0, logos.length - 1)];
};

const App = () => {

  const inputEl = useRef(null);

  const [data, setData] = useState({
    image: logos[getRandomNumBetween(0, logos.length - 1)],
    status: 0,
    lives: INITIAL_LIVES,
    points: 0,
    input: '',
  });

  const [loader, setLoader] = useState(false);

  const [popup, setPopup] = useState(true);

  const nextStep = (e, status) => {

    // define correct or wrong answer
    setData({
      ...data,
      lives: status === -1 ? data.lives - 1 : data.lives,
      input: '',
      status: status,
    });

    status === -1 && changeImage(status);

  };

  const changeImage = (status) => {

    // after one second generate another image
    setTimeout(() => {

      // delete the correct answer from the data object
      status === 1 && logos.splice(logos.findIndex(obj => obj.name === data.image.name), 1);

      setData({
        ...data,
        lives: status === -1 ? data.lives - 1 : data.lives,
        points: status === -1 ? data.points : data.points + 1,
        input: '',
        status: 0,
        image: getRandomImage(),
      });

      if (inputEl.current) {
        if (handleDeviceDetection()) {
          inputEl.current.blur();
        } else {
          inputEl.current.focus();
        }
      }

    }, 1000);
  };

  const checkValue = (e) => {
    if (e.keyCode === 13) {
      if (inputEl.current && handleDeviceDetection()) {
          inputEl.current.blur();
      }
      nextStep(e, data.input.toLowerCase().replace(/ /g,'').match(data.image.name, 'g') ? 1 : -1);
    }
  };

  const livesCounter = () => {
    let i = 0;
    let currentLives = [];
    for (i; i < data.lives; i++) {
      currentLives.push(<LazyLoadImage key={i} className="health__life" width="40px" src={Life} alt="life" />)
    }

    let d = 0;
    let lostLives = [];
    for (d; d < Math.abs(data.lives - INITIAL_LIVES); d++) {
      lostLives.push(<LazyLoadImage key={d} className="health__life" style={{ opacity: "0.3" }} width="40px" src={Life} alt="life" />)
    }

    return [
      currentLives,
      lostLives
    ];
  };

  return (
    <div className="app">
      {popup &&
        <div className="popup">
          <h2>🎉 Welcome to Devs quiz!</h2>
          <p>I will show you some partial images of logos related to programming languages, databases, tools and more!</p>
          <p>You will have to answer with the correct answer! (Or what you believe is the right answer) 🤓</p>
          <button
            type="button"
            onClick={() => {
              setPopup(false);
              inputEl.current.focus();
            }}>
              Let's do this!
            </button>
        </div>
      }
      {(!data.status && !!logos.length && !!data.lives) &&
        <div className="message message--state-default">
          <span>What is it?</span>
        </div>
      }
      {!!data.status &&
        <div className={data.status === 1 ? "message message--state-success" : "message message--state-failure"}>
          {data.status === 1 ? <span>{success[getRandomNumBetween(0, 10)]}</span> :
            <span>{failure[getRandomNumBetween(0, 5)]}</span>}
        </div>
      }
      <div className="game">
        {(!!logos.length && !!data.lives) &&
          <React.Fragment>
            <div className="random-image">
              <LazyLoadImage
                effect="blur"
                key={data.status === 1 ? data.image.main : data.image.placeholder}
                alt="programming language logo"
                className="random-image__element"
                style={{ display: loader && 'none' }}
                src={data.status === 1 ? data.image.main : data.image.placeholder}
                beforeLoad={() => setLoader(true)}
                afterLoad={() => {
                  setLoader(false);
                  data.status && changeImage(data.status);
                }}
              />
              {loader &&
                <span>
                  <img
                    alt="programming language logo"
                    className="random-image__element"
                    src={data.image.placeholder}
                  />
                  <LazyLoadImage
                    effect="blur"
                    alt="loading..."
                    wrapperClassName="random-image__loader"
                    src={Loader}
                  />
                </span>
              }
            </div>
            <label hidden htmlFor="language">Language</label>
            <input
              ref={inputEl}
              className="input"
              type="text"
              onChange={(e) => setData({ ...data, input: e.target.value })}
              onKeyDown={(e) => checkValue(e)}
              autoComplete="off"
              name="language"
              value={data.input}
              autoFocus={ !handleDeviceDetection() }
              disabled={data.status !== 0}
            />
          </React.Fragment>
        }
        {(!logos.length || !data.lives) &&
          <React.Fragment>
            <div className="random-image">
              {!logos.length ?
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
          </React.Fragment>
        }
        <div className="health">
          {livesCounter()}
        </div>
      </div>
    </div>
  );
};

export default App;
