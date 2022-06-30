import React from "react";

import { AnswerObject } from "../App";

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
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
        Question: {questionNr}/{totalQuestions}
      </p>

      <p dangerouslySetInnerHTML={{ __html: question }}></p>
      {console.log("the answers are:", answers)}
      <div>
        {answers.map((answer) => (
          <div key={answer}>
            <button
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default QuestionCard;
