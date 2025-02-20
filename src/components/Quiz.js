import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  multipleChoiceQuestions,
  integerTypeQuestions,
} from "../utils/questions";
import { initDB, saveQuizAttempt } from '../utils/indexedDB';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentSection, setCurrentSection] = useState("multiple-choice"); // 'multiple-choice' or 'integer'
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [db, setDb] = useState(null);



  useEffect(() => {
    const initializeDB = async () => {
      const database = await initDB();
      setDb(database);
    };
    initializeDB();
  }, []);



  useEffect(() => {
    if (timeLeft === 0) {
      setDisabled(true);
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);


  const questions =
    currentSection === "multiple-choice"
      ? multipleChoiceQuestions
      : integerTypeQuestions;

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = () => {
    const isCorrect =
      currentSection === "multiple-choice"
        ? selectedOption === currentQuestion.answer
        : parseInt(selectedOption) === currentQuestion.answer;
  
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion.id]: selectedOption,
    }));
  
    setDisabled(true);
    setIsSubmitted(true);
  };
  
  const handleNextQuestion = async () => {

    const lastIndex = questions.length;
    console.log(lastIndex)
    console.log(currentQuestionIndex)

    if (currentQuestionIndex < lastIndex-2) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimeLeft(30);
    } else if (currentSection === "multiple-choice") {
      setCurrentSection("integer");
      setCurrentQuestionIndex(0);
    } else {
      setQuizCompleted(true);
    }
    setDisabled(false);
    setIsSubmitted(false);
    setSelectedOption('');
    setSelectedOption('');
  };
  
  // const handleQuizCompletion = async () => {
  //   // setQuizCompleted(true);
  //   const attempt = {
  //     userId: 'user123', // Replace with dynamic user ID if available
  //     score: score,
  //     timestamp: new Date(),
  //   };
  //   await saveQuizAttempt(attempt);
  // };

  if (quizCompleted) {
    // handleQuizCompletion();
    return <Navigate to="/score" state={{ score }} />;
  }

  const getOptionLabel = (index) => String.fromCharCode(65 + index);

  return (
    <div className="quiz__dashboard">
      <div className="time__left">Time Left: {timeLeft}s</div>
      <div className="question__list">
        <h3 className="question__name">
          <span className="question__number">{currentQuestionIndex + 1}</span>{" "}
          {currentQuestion.question}
        </h3>
        {currentSection === "multiple-choice" ? (
          <div>
            {currentQuestion.options.map((option, n) => {
                const isCorrect = option === currentQuestion.answer;
                const isSelected = option === selectedOption;
                const optionStyle = isSubmitted
                  ? isCorrect
                    ? { backgroundColor: '#3bff3b3f' } // Green for correct
                    : isSelected
                    ? { backgroundColor: '#ff3b3b3f' } // Red for incorrect selection
                    : {}
                  : {};
              
                return (
              <button
              className="option"
              key={option}
              value={option}
              style={optionStyle}
              onClick={() => setSelectedOption(option)}
              disabled={isSubmitted} // Disable options after submission
              >
                {`${getOptionLabel(n)}. ${option}`}
              </button>
)})}
          </div>
        ) : (
          <input
            type="text"
            className="user__input"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
        )}
        <div className="buttons_area">
          <button
            disabled={disabled}
            className="submit__button"
            onClick={handleAnswer}
            style={{
              backgroundColor: disabled ? 'gray' : '',
              cursor: disabled ? "not-allowed" : 'pointer'
            }}
          >
            Submit
          </button>
          <button
            onClick={handleNextQuestion}
            className="next__button"
            disabled={
              currentQuestionIndex === multipleChoiceQuestions.length - 1
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
