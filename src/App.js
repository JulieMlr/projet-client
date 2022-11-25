import React from 'react';
import './App.css';
import Connexion from './components/Connexion';
import Creation from './components/Creation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Connexion />} />
          <Route path='/creation' element={<Creation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
