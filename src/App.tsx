import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
import spinner from "./images/spinner_loading.gif";
//importing components
import QuestionCard from "./components/QuestionCard";

//importing types
import { QuestionState, Difficulty } from "./API";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTALQUESTIONS = 10;

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, SetGameOver] = useState(true);

  console.log("questions ar:", questions);
  console.log("user Answers are:", userAnswers);
  const startTrivia = async () => {
    setLoading(true);
    SetGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTALQUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //user answer
      const answer = e.currentTarget.value;
      //check answer against correct answer

      const correct = questions[number].correct_answer === answer;
      //add score if answer correct
      if (correct) setScore((prev) => prev + 1);
      //save answer in the array  for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTALQUESTIONS) {
      SetGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <div className="App">
      <h1>Quiz.me</h1>

      {gameOver || userAnswers.length === TOTALQUESTIONS ? (
        <div>
          <>
            {questions.map((el) => {
              return (
                <div key={el.question}>
                  <p>{el.question}</p>
                  {el.answers.map((ans) => {
                    return (
                      <div>
                        <p>{ans}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </>
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        </div>
      ) : null}

      {!gameOver ? <p className="score">Score:{score} </p> : null}

      {loading && <img src={spinner} alt="loading" />}

      {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTALQUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}

      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTALQUESTIONS - 1 ? (
        <button
          className="next"
          onClick={nextQuestion}
          disabled={userAnswers[number] ? false : true}
        >
          Next Question
        </button>
      ) : null}
    </div>
  );
};

export default App;
