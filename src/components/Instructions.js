import React from "react";
import { Link } from "react-router-dom";

const Instructions = () => {
  const instruction = [
    "For multiple-choice questions, select the one best answer (A, B, C, or D)",
    "For integer-type questions, write your numerical answer clearly.",
    "No calculators unless specified.",
    "You have 30 minutes to complete this quiz.",
  ];
  return (
    <div className="instructions">
      <h1>🚀Instructions:</h1>
      <ul>
        {instruction.map((item, index) => (
          <li key={index}>✨{item}</li>
        ))}
      </ul>
      <Link to='/home'>
                <button className='btn'>Start Quiz</button>
              </Link>
    </div>
  );
};

export default Instructions;
