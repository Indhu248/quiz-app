// src/QuizHistory.js
import React, { useEffect, useState } from 'react';
import { initDB, getUserQuizHistory } from './indexedDB';

const QuizHistory = ({ userId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const db = await initDB();
      const userHistory = await getUserQuizHistory(db, userId);

}})
 
