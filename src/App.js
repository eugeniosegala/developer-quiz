import React, { useState, useRef, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import './App.css';
import { logos } from './images';
import Win from './assets/win.gif';
import gameOver from './assets/game-over.gif';
import Life from './assets/life.png';
import Loader from './assets/loader.gif';
import { getRandomNumBetween } from './helpers/random';

import Message from './components/Message';

const INITIAL_LIVES = 3;

const handleDeviceDetection = () => {
  return navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
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

  useEffect(() => {
    if (inputEl.current) {
      if (handleDeviceDetection()) {
        inputEl.current.blur();
      } else {
        inputEl.current.focus();
      }
    }
  }, [loader]);

  const nextStep = (e, status) => {

    // define correct or wrong answer
    setData({
      ...data,
      lives: status === -1 ? data.lives - 1 : data.lives,
      input: '',
      status: status,
    });

    status === -1 && changeImage(status);

    if (handleDeviceDetection()) {
      inputEl.current.blur();
    }

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

    }, 1000);
  };

  const checkValue = (e) => {
    if (e.keyCode === 13) {
      nextStep(e, data.input.toLowerCase().replace(/ /g,'').match(data.image.name, 'g') ? 1 : -1);
    }
  };

  const livesCounter = () => {
    let i = 0;
    let currentLives = [];
    for (i; i < data.lives; i++) {
      currentLives.push(<LazyLoadImage key={i} className="app__game__health__life" src={Life} alt="life" />)
    }

    let d = 0;
    let lostLives = [];
    for (d; d < Math.abs(data.lives - INITIAL_LIVES); d++) {
      lostLives.push(<LazyLoadImage key={d} className="app__game__health__life" style={{ opacity: "0.3" }} src={Life} alt="life" />)
    }

    return [
      currentLives,
      lostLives
    ];
  };

  return (
    <div className="app">
      {popup &&
        <div className="app__popup">
          <h2><span role="img" aria-label="party icon">🎉</span> Welcome to Devs quiz!</h2>
          <p>I will show you some partial images of logos related to programming languages, databases, tools and more!</p>
          <p>You will have to answer with the correct answer! (Or what you believe is the correct answer) <span role="img" aria-label="nerd icon">🤓</span></p>
          <button
            className="app__popup__button"
            type="button"
            onClick={() => {
              setPopup(false);
              if (!handleDeviceDetection()) {
                inputEl.current.focus();
              }
            }}
          >
              Let's do this!
            </button>
        </div>
      }
      {(!data.status && !!logos.length && !!data.lives) &&
        <div className="app__message app__message--state-default">
          <span>What is it?</span>
        </div>
      }
      {!!data.status &&
        <Message status={data.status} />
      }
      <div className="app__game">
        {(!!logos.length && !!data.lives) &&
          <div className="app__game__main">
            <span className="app__game__main__container">
              <LazyLoadImage
                effect="blur"
                key={data.status === 1 ? data.image.main : data.image.placeholder}
                alt="programming language logo"
                className="app__game__main__container__image"
                style={{ display: loader && 'none' }}
                src={data.status === 1 ? data.image.main : data.image.placeholder}
                beforeLoad={() => setLoader(true)}
                afterLoad={() => {
                  setLoader(false);
                  data.status && changeImage(data.status);
                }}
              />
              {loader &&
                <React.Fragment>
                  <img
                    alt="programming language logo"
                    className="app__game__main__container__image"
                    src={data.image.placeholder}
                  />
                  <LazyLoadImage
                    effect="blur"
                    alt="loading..."
                    wrapperClassName="app__game__main__container__loader"
                    src={Loader}
                  />
                </React.Fragment>
              }
            </span>
            <input
              ref={inputEl}
              className="app__game__main__input"
              type="text"
              onChange={(e) => setData({ ...data, input: e.target.value })}
              onKeyDown={(e) => checkValue(e)}
              autoComplete="off"
              name="language"
              value={data.input}
              autoFocus={ !handleDeviceDetection() }
              disabled={data.status !== 0 || loader}
            />
          </div>
        }
        {(!logos.length || !data.lives) &&
          <div className="app__game__main">
            <div className="app__game__main__container">
              {!logos.length ?
                <LazyLoadImage effect="blur" className="app__game__main__container__image" src={Win} alt="win"/>
                :
                <LazyLoadImage effect="blur" className="app__game__main__container__image" src={gameOver} alt="win"/>
              }
            </div>
            <div className="app__game__main__ending">
              <div>Score: <span className="app__game__main__ending__score">{data.points}</span></div>
              <div>Lives: <span className="app__game__main__ending__score">{data.lives}</span></div>
              <p className="app__game__main__ending__retry" onClick={() => window.location.reload()}> Retry?</p>
            </div>
          </div>
        }
        <div className="app__game__health">
          {livesCounter()}
        </div>
      </div>
    </div>
  );
};

export default App;
