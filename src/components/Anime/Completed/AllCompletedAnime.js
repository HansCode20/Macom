import React, { useEffect, useState } from 'react';
import PaginationControlsCompletedAnime from '../../PaginationControls/PaginationControlsCompletedAnime';
import { useNavigate } from 'react-router-dom';
import { getAnimeCompleted } from '../../../utils/AnimeApi';
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import '../../../style/LoaderDetails.css';


const AllCompletedAnime = () => {
    const navigate = useNavigate();
    const [completedAnime, setCompletedAnime] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchCompletedAnime = async (page) => {
        setLoading(true);
        try {
            setTimeout(async () => {         
                const response = await getAnimeCompleted(page);
                setCompletedAnime(response.data.animeList);
                setCurrentPage(response.pagination.currentPage);
                setTotalPages(response.pagination.totalPages);
                setLoading(false);
            }, 1000);
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        fetchCompletedAnime(currentPage);
    }, [currentPage]);


    const setHandlePageChange = (newPage) => {
        navigate(`/anime/completed/${newPage}`)
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
    <div className="grid grid-cols-2 lg:grid-cols-6 md:grid-cols-3 gap-6 p-10 mt-20">
        {completedAnime && completedAnime.length > 0 ? (
            completedAnime.map((anime) => (
                <div 
                 key={anime.animeId} 
                 className="relative group" 
                 onClick={() => handleAnimeById(anime.animeId)}
                 >

                    <div className="relative space-y-3 hover:scale-105 duration-300">
                        <div className="absolute flex items-center gap-2 top-0 p-1 bg-black/70 text-sm ">
                            <PiTelevisionSimpleFill />
                            {anime.status}
                        </div>

                        <div className="absolute top-5 p-1 bg-black/60 text-sm">
                           {anime.type}
                        </div>

                        <div className="absolute flex items-center gap-2 top-1/2 right-0 p-1 bg-[#433d8b] text-xs lg:text-sm rounded-l-md">
                            <FaStar className="text-[orange]" />
                            {anime.score || 'Rating Uknown'}
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
                <p>No ongoing anime found</p>
        )}

        <div className='col-span-full'>
          <PaginationControlsCompletedAnime
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setHandlePageChange}
          />
        </div>

    </div>
  )
}

export default AllCompletedAnime