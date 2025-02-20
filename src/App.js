import React from 'react'
import Welcome from './components/Welcome'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Score from './components/Score'
import History from './components/History'
import Instructions from './components/Instructions'


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path='/score' element={<Score />} />
      <Route path="/history" element={<History />} />
      <Route path='/instructions' element={<Instructions />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App

