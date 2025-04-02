import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
                <div className="flex-grow">
                  <Navigation />
                  <Routes>

                    {/* Animes Pages */}
                    <Route path="/" element={<Anime />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/anime/:id" element={<AnimeById />} />
                    <Route path="/batch/:id" element={<BatchById />} />
                    <Route path="/movies" element={<AllMovies />} />
                    <Route path="/movies/:page" element={<AllMovies />} />
                    <Route path="/batch-list" element={<AllBatch />} />
                    <Route path="/batch-list/:page" element={<AllBatch />} />
                    <Route path="/anime-list" element={<AnimeList />} />
                    <Route path="/jadwalrilis" element={<Schedule />} />
                    <Route path="/on-going" element={<Ongoing />} />
                    <Route path="/on-going/:page" element={<Ongoing />} />
                    <Route path="/completed" element={<CompletedAnime />} />
                    <Route path="/completed/:page" element={<CompletedAnime />} />
                    <Route path="/genres" element={<GenreList />} />
                    <Route path="/genres/:id" element={<GenreListId />} />
                    <Route path="/genres/:id/:page" element={<GenreListId />} />
                    <Route path="/episode/:id" element={<EpisodeById/>} />
                  </Routes>
                </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
