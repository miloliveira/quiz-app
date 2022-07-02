import React, { useState } from "react";

import { fetchQuizQuestions } from "./API";

//importing components
import QuestionCard from "./components/QuestionCard";

//importing types
import { QuestionState, Difficulty } from "./API";

//importing styles
import { GlobalStyle, Wrapper, StartBtnDiv } from "./App.styles";
import { InnerWrapper } from "./components/QuestionCard.styles";

//
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
//defining the total number  of questions
const TOTALQUESTIONS = 10;

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, SetGameOver] = useState(true);

  //Start Game function
  const startTrivia = async () => {
    setLoading(true);
    SetGameOver(false);
    //fetching API
    const newQuestions = await fetchQuizQuestions(
      TOTALQUESTIONS,
      Difficulty.EASY
    );
    //setting default values of variables
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };
  //check if answer is correct function
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
  // get the next question function
  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTALQUESTIONS) {
      SetGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <div>
      <GlobalStyle />
      <Wrapper>
        <h1>Quiz.me</h1>

        {gameOver || userAnswers.length === TOTALQUESTIONS ? (
          <StartBtnDiv>
            <button className="btnStart" onClick={startTrivia}>
              Start
            </button>
          </StartBtnDiv>
        ) : null}

        {!gameOver ? <p className="score">Score: {score} </p> : null}

        {loading && <p>Loading the questions ...</p>}

        {!loading && !gameOver && (
          <InnerWrapper>
            <QuestionCard
              questionNr={number + 1}
              totalQuestions={TOTALQUESTIONS}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          </InnerWrapper>
        )}

        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTALQUESTIONS - 1 ? (
          <button
            className="btnNext"
            onClick={nextQuestion}
            disabled={userAnswers[number] ? false : true}
          >
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </div>
  );
};

export default App;
