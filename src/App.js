import './index.scss';
import React, { useState } from 'react';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: [
      'приложение',
      'часть приложения или страницы',
      'то, что я не знаю что такое',
    ],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
];

function Result({ rightAnswer }) {
  return (
    <div className="result">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png"
        alt="img"
      />
      <h2>
        Вы отгадали {rightAnswer} ответа из {questions.length}
      </h2>
      <a href="/">
        <button>Попробовать снова</button>
      </a>
    </div>
  );
}

function Game({
  step,
  setStep,
  question,
  checkVariants,
  goToNextQuestion,
  progress,
}) {
  return (
    <>
      <div className="progress">
        <div
          style={{ width: `${progress}%` }}
          className="progress__inner"
        ></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((variant, index) => {
          return (
            <li key={index} onClick={() => goToNextQuestion(index)}>
              {variant}
            </li>
          );
        })}
      </ul>
    </>
  );
}

function App() {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [rightAnswer, setRightAnswer] = useState(0);
  let stateProgress = Math.round((1 / questions.length) * 100);
  const question = questions[step];
  function goToNextQuestion(index) {
    checkVariants(index);
    setStep(step + 1);
  }
  function checkVariants(index) {
    if (question.correct === index) {
      setRightAnswer(() => rightAnswer + 1);
      setProgress(progress + stateProgress);
    }
  }
  return (
    <div className="App">
      {step !== questions.length ? (
        <Game
          step={step}
          setStep={setStep}
          question={question}
          goToNextQuestion={goToNextQuestion}
          checkVariants={checkVariants}
          progress={progress}
        />
      ) : (
        <Result rightAnswer={rightAnswer} />
      )}
    </div>
  );
}

export default App;
