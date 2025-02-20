
import React, { useEffect, useState } from 'react';
import { initDB } from '../utils/db';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const db = await initDB();
      const tx = db.transaction('quizAttempts', 'readonly');
      const store = tx.objectStore('quizAttempts');
      const allAttempts = await store.getAll();
      setHistory(allAttempts);
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <h2>Quiz History</h2>
      {history.length === 0 ? (
        <p>No quiz attempts found.</p>
      ) : (
        <ul>
          {history.map((attempt) => (
            <li key={attempt.id}>
              User: {attempt.userId}, Score: {attempt.score}, Date:{' '}
              {new Date(attempt.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
