import React, { useEffect, useState } from 'react'
import { getGenreListId } from '../../../utils/AnimeApi';
import PaginationGenreId from '../../PaginationControls/PaginationGenreId';
import { useNavigate, useParams } from 'react-router-dom';
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";


const GenreListId = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [genreListId, setGenreListId] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchGenreId = async (page) => {
          setLoading(true);
          try {
            const response = await getGenreListId(id, page);
            setGenreListId(response.data.animeList);
            setCurrentPage(response.pagination.currentPage);
            setTotalPages(response.pagination.totalPages);
            setLoading(false);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false)
          }
        };
        fetchGenreId(currentPage);
      }, [id, currentPage]);

      const handlePageChange = (newPage) => {
        navigate(`/anime/genres/${id}/${newPage}`)
        setCurrentPage(newPage);
      };

      const handleAnimeById = (id) => {
        navigate(`/anime/${id}`)
      };
    

      if (loading) {
        return (
          <div class="loadingtext flex justify-center items-center h-screen">
            <p>Loading</p>
          </div>
        );
      };

  return (
    <div className='grid grid-cols-2 lg:grid-cols-6 gap-6 p-10'>
        {genreListId && genreListId.length > 0 ? (
        genreListId.map((anime) => (
          <div key={anime.animeId} className="relative group cursor-pointer" onClick={() => handleAnimeById(anime.animeId)}>
            <div className="relative space-y-3 hover:scale-105 duration-300">
              <div className="absolute flex items-center gap-2 top-0 p-1 bg-black/70 text-sm ">
                <PiTelevisionSimpleFill />
                {anime.status}
              </div>

              <div className="absolute top-5 p-1 bg-black/60 text-xs">
                {anime.type}
              </div>

              <div className="absolute flex items-center gap-2 top-1/2 right-0 p-1 bg-[#433d8b] text-xs lg:text-sm">
                <FaStar className="text-[orange]" />
                {anime.score || "rating unknown"}
              </div>

              <img
                src={anime.poster}
                alt={anime.title}
                className="w-full h-72 md:h-80 lg:h-80 object-cover rounded-lg"
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
        <p>No Genre anime found</p>
      )}

      <div className='col-span-full'>
        <PaginationGenreId
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

    </div>
  )
}

export default GenreListId