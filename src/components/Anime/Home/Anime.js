import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAnimeHome } from "../../../utils/AnimeApi";
import RecentAnime from "./RecentAnime";
import MovieAnime from "./MovieAnime";
import BatchAnime from "./BatchAnime";
import "../../../style/LoaderDetails.css";

const Anime = () => {
  const navigate = useNavigate();
  const [recentAnime, setRecentAnime] = useState([]);
  const [movieAnime, setMovieAnime] = useState([]);
  const [batchAnime, setBatchAnime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnime = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAnimeHome();
      setRecentAnime(response.data.recent.episodeList);
      setMovieAnime(response.data.movie.animeList);
      setBatchAnime(response.data.batch.batchList);
    } catch (error) {
      console.error(error);
      setError("Failed to load anime data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnime();
  }, []);

  if (loading) {
    return (
      <div className="loadingtext flex justify-center items-center h-screen">
        <p>Loading..</p>
      </div>
    );
  };

  if (error) {
    return (
      <div className="error-message flex justify-center items-center h-screen">
        <p>{error}</p>
      </div>
    );
  };

  const buttonMovieClick = () => {
    navigate(`/anime/movies`)
  }

  const buttonBatchClick = () => {
    navigate(`/anime/daftar-batch`)
  };

  return (
    <div className="p-4 space-y-20 mt-10">
      <div className="flex flex-col md:flex-row justify-between  gap-20">
        {/* Mengatur flex agar tampil samping-sampingan */}
        <div className="w-2/2 space-y-5">
          <h1 className="text-3xl">Anime Terbaru</h1>
          <RecentAnime recentAnime={recentAnime} />
        </div>

        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <h1 className="text-lg">Movie Anime</h1>
            <button onClick={() => buttonMovieClick()} className="p-2 bg-[#433D8B] rounded-lg">View All</button>
          </div>
          <MovieAnime movieAnime={movieAnime} />
        </div>

      </div>

      <div className="space-y-5">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl">Batch Anime</h1>
            <button onClick={() => buttonBatchClick()} className="p-2 bg-[#433D8B] rounded-lg">View All</button>
          </div>
          <BatchAnime batchAnime={batchAnime} />
      </div>
    </div>
  );
};

export default Anime;
