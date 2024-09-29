import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Import Pages
import Home from './Pages/Home';
import MangaDetails from './components/Filtering/MangaDetails';
import MangaChapter from './components/Filtering/MangaChapter';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/manga/:id' element={<MangaDetails />} />
            <Route path='/manga/:id/:ch' element={<MangaChapter />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
