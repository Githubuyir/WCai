import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Matches from './pages/Matches';
import MatchAnalysis from './pages/MatchAnalysis';
import Teams from './pages/Teams';
import TeamAnalysis from './pages/TeamAnalysis';
import Insights from './pages/Insights';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="matches" element={<Matches />} />
          <Route path="analysis/:id" element={<MatchAnalysis />} />
          <Route path="teams" element={<Teams />} />
          <Route path="team-analysis" element={<TeamAnalysis />} />
          <Route path="insights" element={<Insights />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
