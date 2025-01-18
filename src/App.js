import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Import Pages/Manga
import Home from "./Pages/Home";
import Navbar from "./components/Manga/Navigation/Navbar";


// Import Anime Components
import Anime from "./components/Anime/Home/Anime";
import AnimeList from "./components/Anime/AnimeList/AnimeList";
import Navigation from "./components/Anime/Navigation/Navigation";
import Footer from "./components/Anime/Navigation/Footer";
import Schedule from "./components/Anime/Schedule/Schedule";
import Ongoing from "./components/Anime/Ongoing/AllOngoing";
import CompletedAnime from "./components/Anime/Completed/AllCompletedAnime";
import GenreList from "./components/Anime/Genre List/GenreList";
import GenreListId from "./components/Anime/Genre List/GenreListId";
import AnimeById from "./components/Anime/Home/ById/AnimeById";
import AllBatch from "./components/Anime/Batch/AllBatch";
import AllMovies from "./components/Anime/Movie/AllMovie";
import BatchById from "./components/Anime/Home/ById/BatchById";
import SearchResults from "./components/Anime/Searching/SearchResults";
import EpisodeById from "./components/Anime/Home/ById/EpisodeById";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        {/* Bagian konten utama */}
        <div className="flex-grow lg:mt-0">
          <Routes>
            {/* Route untuk Home */}
            <Route 
              path="/*" 
              element={
              <>
                <Navbar/>
                
                <Routes>
                  <Route path="/" element={<Home />} />
                </Routes>
              </>
              } />


            {/* Route untuk Anime dengan Navigation dan Footer */}
            <Route
              path="/anime/*"
              element={
                <>
                  {/* Navigation yang akan ditampilkan pada semua route anime */}
                  <Navigation />

                  {/* Nested Routes khusus untuk Anime */}
                  <Routes>
                    <Route path="" element={<Anime />} />
                    <Route path="search" element={<SearchResults />} />
                    <Route path=":id" element={<AnimeById />} />
                    <Route path="batch/:id" element={<BatchById />} />
                    <Route path="movies" element={<AllMovies />} />
                    <Route path="movies/:page" element={<AllMovies />} />
                    <Route path="daftar-batch" element={<AllBatch />} />
                    <Route path="daftar-batch/:page" element={<AllBatch />} />
                    <Route path="anime-list" element={<AnimeList />} />
                    <Route path="jadwalrilis" element={<Schedule />} />
                    <Route path="on-going" element={<Ongoing />} />
                    <Route path="on-going/:page" element={<Ongoing />} />
                    <Route path="completed" element={<CompletedAnime />} />
                    <Route path="completed/:page" element={<CompletedAnime />} />
                    <Route path="genres" element={<GenreList />} />
                    <Route path="genres/:id" element={<GenreListId />} />
                    <Route path="genres/:id/:page" element={<GenreListId />} />
                    <Route path="episode/:id" element={<EpisodeById/>} />
                  </Routes>
                </>
              }
            />
          </Routes>
        </div>
        
        {/* Footer selalu berada di bawah */}
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
