import { openDB } from 'idb';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Confetti from 'react-confetti';
import award from '../utils/award.png'

const Score = () => {
  const location = useLocation();
  const {score} = location.state || {score: 0};
  useEffect(() => {
    const saveScore = async () => {
      const db = await openDB('quiz-db', 1, {
        upgrade(db) {
          db.createObjectStore('scores', { autoIncrement: true });
        },
      });
      await db.add('scores', { score, date: new Date() });
    };

    saveScore();
  }, [score]);

  return (
    <div className='score__board'>
       <Confetti mode="boom" particleCount={50} colors={['white', 'gold']} />
       <div className='your__score'>
       <img src={award} alt='award'/>
       <h1> Congratulations</h1>
       <h2>Your Score: {score}</h2>
       <p>Wanna retake the test <Link to='/home'>Click here</Link></p>
       // <p>See your previous history <Link to='/history'>Click here</Link></p>
       </div>
      {/* Additional code to display past scores */}
    </div>
  );
};

export default Score;
