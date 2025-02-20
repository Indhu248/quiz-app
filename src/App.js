import React from 'react'
import Welcome from './components/Welcome'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Score from './components/Score'
import History from './components/History'


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path='/score' element={<Score />} />
      <Route path="/history" element={<History />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App

