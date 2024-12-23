import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoPage from './pages/TodoPage';
import DndPage from './pages/Dnd';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/dnd" element={<DndPage />} />
      </Routes>
    </Router>
  );
}

export default App;
