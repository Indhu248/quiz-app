import React from 'react'
import { Link, Outlet } from 'react-router-dom'
// import star from '../utils/star.svg'

const Welcome = () => {
  return (
    <div className='welcome'>
      <header>
        <h1>Welcome to the Quiz App</h1>
        <p>Challenge yourself with our diverse set of questions. Ready to begin?</p>
      </header>
      <nav>
        <Link to='/home'>
          <button className='btn'>Start Quiz</button>
        </Link>
      </nav>
      </div>
  )
}

export default Welcome
