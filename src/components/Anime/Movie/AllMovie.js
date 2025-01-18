import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMovieAnime } from '../../../utils/AnimeApi';
import PaginationControlsMovie from '../../PaginationControls/PaginationControlsMovie.js';
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import '../../../style/LoaderDetails.css';

const AllMovie = () => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchMovieAnime = async (page) => {
    setLoading(true);
    try {
      const response = await getMovieAnime(page);
      setMovie(response.data.animeList);
      setCurrentPage(response.pagination.currentPage);
      setTotalPages(response.pagination.totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error, "Failed to fetch Batch Anime");
    }
  };

  useEffect(() => {
    fetchMovieAnime(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    navigate(`/anime/movies/${newPage}`)
    setCurrentPage(newPage);
  };

  const handleAnimeById = (id) => {
    navigate(`/anime/${id}`)
  };
  
  if (loading) {
    return (
      <div className="loadingtext flex justify-center items-center h-screen">
         <p>Loading..</p>
      </div>
    )
  }

  return (
    <div className='container mx-auto space-y-5 p-4'>
      <h1 className='text-3xl'>Daftar Movie Anime</h1>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6'>
        {movie && movie.length > 0 ? (
          movie.map((anime, index) => (
            <div 
             key={anime.animeId} 
             className="relative group cursor-pointer"
             onClick={() => handleAnimeById(index.animeId)}
             >
              <div className="relative space-y-3 hover:scale-105 duration-300">
                <div className="absolute flex items-center gap-2 top-0 p-1 bg-black/70 text-sm ">
                  <PiTelevisionSimpleFill />
                  {anime.status}
                </div>

                <div className="absolute top-5 p-1 bg-black/60 text-sm">
                  {anime.type}
                </div>

                <div className="absolute flex items-center gap-2 top-1/2 right-0 p-1 bg-[#433d8b] text-xs lg:text-sm">
                  <FaStar className="text-[orange]" />
                  {anime.score}
                </div>

                <img
                  src={anime.poster}
                  alt={anime.title}
                  className="w-full h-60 md:h-80 lg:h-80 object-cover rounded-lg"
                  referrerPolicy='no-referrer'
                />
                <div className="absolute bottom-0 p-5 bg-gradient-to-t from-black w-full space-y-2 bg-gray-500/60">
                  <p className="text-center text-white/90 text-sm font-medium truncate">
                    {anime.title}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No Batch anime found</p>
        )}
      </div>

      <div className="col-span-full">
        <PaginationControlsMovie
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AllMovie;
