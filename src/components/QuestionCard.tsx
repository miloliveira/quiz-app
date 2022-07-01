import React from "react";
//importing types
import { AnswerObject } from "../App";

//importing styles
import { ButtonWrapper } from "./QuestionCard.styles";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

//When it's a component, specify the type writing: React.FC
// If it takes props, define the types before
//then define the props on the funtion between <>
const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => {
  return (
    <>
      <p className="number">
        Question {questionNr}/{totalQuestions}
      </p>

      <p dangerouslySetInnerHTML={{ __html: question }}></p>
      {console.log("the answers are:", answers)}
      <div>
        {answers.map((answer) => (
          <ButtonWrapper
            key={answer}
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer === answer}
          >
            <button
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </>
  );
};

export default QuestionCard;
