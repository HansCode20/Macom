import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAnimeHome } from "../../../utils/AnimeApi";
import BannerAnime from "../Banner/BannerAnime";
import RecentAnime from "./RecentAnime";
import MovieAnime from "../Movie/MovieAnime";
import Schedule from "../Schedule/Schedule";
import BatchAnime from "../Batch/BatchAnime";
import "../../../style/LoaderDetails.css";
import PopularAnime from "../Popular/PopularAnime";
import GenreList from "../Genre List/GenreList";

const Anime = () => {
  const navigate = useNavigate();
  const [bannerAnime, setBannerAnime] = useState([]);
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
      setBannerAnime(response.data.movie.animeList); 
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
        <p>Loading</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message flex justify-center items-center h-screen">
        <p>{error}</p>
      </div>
    );
  }

  const buttonMovieClick = () => {
    navigate(`/movies`);
  };

  const buttonBatchClick = () => {
    navigate(`/batch-list`);
  };

  return (
    <div className="space-y-20 bg-black">
      <div className=" flex flex-col gap-20">
        {/* Mengatur flex agar tampil samping-sampingan */}
        <div>
          <BannerAnime BannerAnime={bannerAnime} />
        </div>

        <div className="container mx-auto p-4 space-y-20 mt-[-50px]">
          <div className="space-y-5">
            <h1 className="text-3xl">Latest Anime</h1>
            <RecentAnime recentAnime={recentAnime} />
          </div>

          <div className="space-y-5">
            <h1 className="text-3xl">Popular Anime</h1>
            <PopularAnime />
          </div>

          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl">Movie Anime</h1>
              <button
                onClick={() => buttonMovieClick()}
                className="p-2 bg-[#374151] rounded-lg"
              >
                View All
              </button>
            </div>
            <MovieAnime movieAnime={movieAnime} />
          </div>

          <div className="space-y-5">
            <h1 className="text-3xl">release Schedule</h1>
            <Schedule />
          </div>

          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl">Batch Anime</h1>
              <button
                onClick={() => buttonBatchClick()}
                className="p-2 bg-[#374151] rounded-lg"
              >
                View All
              </button>
            </div>
            <BatchAnime batchAnime={batchAnime} />
          </div>

          <div>
            <GenreList/>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Anime;
