import React from 'react';
import './App.css';
import Connexion from './components/Connexion';
import Creation from './components/Creation';
import Prestation from './components/Prestation';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RendezVous from './components/RendezVous';


function App() {


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Connexion />} />
          <Route path='/creation' element={<Creation />} />
          <Route path='/prestation/:idClient' element={<Prestation />} />
          <Route path='/rendez-vous/:idClient' element={<RendezVous />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
