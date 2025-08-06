import React from 'react';
import { Routes, Route } from 'react-router';
import Navigation from './components/Navigation/Navigation';
import Homepage from './pages/Homepage/Homepage';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </div>
  );
}

export default App;