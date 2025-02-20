# Quiz Application  

A **React-based quiz application** that allows users to take quizzes with multiple-choice and integer-type questions while tracking their attempts using **IndexedDB**.  

## 🚀 Features  

- Multiple-choice and integer-type questions.  
- Timed questions with a countdown feature.  
- Tracks and displays user quiz history using IndexedDB.  
- Review past quiz attempts with detailed score breakdowns.  

## 🛠 Installation  

1. **Clone the repository:**  
   ```bash
   git clone https://github.com/Indhu248/quiz-app

## 🎮 Usage
- Select a quiz category from the homepage.
- Answer each question within the allotted time.
- Submit the quiz to see your score and review your answers.
- View quiz history to track past attempts and scores.


## 🏗 Project Structure
The application consists of the following key components:
📌 Components
- Quiz.js – Displays available quiz categories.
- Question.js – A reusable component for displaying individual questions.
- Timer.js – Handles countdown timers for timed questions.
- Score.js – Displays the quiz results and correct answers.
- History.js – Fetches and displays past quiz attempts from IndexedDB.


## 🔗 State Management
- React useState & useEffect: Manages quiz state, timers, and user interactions.
- React Context API (if used): Handles global state management across components.
- 🗄 Data Storage (IndexedDB)
- The idb library is used for IndexedDB storage.
- Saves quiz attempts, scores, and timestamps for history tracking.
- Allows users to revisit past quizzes.

## 📦 Dependencies
- React – Frontend framework
- IndexedDB (idb library) – Local data storage
- React Router – Navigation between quiz screens
- CSS-in-JS library (e.g., styled-components) – Styling


## 📜 License
This project is licensed under the MIT License.
