import React, { useEffect, useState } from 'react';
import { getBatchAnime } from '../../../utils/AnimeApi';
import PaginationControlsBatch from '../../PaginationControls/PaginationControlsBatch';
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import '../../../style/LoaderDetails.css';

const AllBatch = () => {
  const navigate = useNavigate();
  const [batch, setBatch] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchBatchAnime = async (page) => {
    setLoading(true);
    try {
      const response = await getBatchAnime(page);
      setBatch(response.data.batchList);
      setCurrentPage(response.pagination.currentPage);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch Batch Anime:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatchAnime(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    navigate(`/anime/daftar-batch/${newPage}`);
  };

  const handleBatchById = (id) => {
    navigate(`/anime/batch/${id}`);
  };

  if (loading) {
    return (
      <div className="loadingtext flex justify-center items-center h-screen">
        <p>Loading</p>
      </div>
    );
  }

  return (
    <>
      <div className='grid grid-cols-2 lg:grid-cols-6 md:grid-cols-3 gap-6 p-10 mt-20'>
        {batch && batch.length > 0 ? (
          batch.map((anime) => (
              <div 
                    key={anime.animeId} 
                    className="relative overflow-hidden group cursor-pointer"
                    onClick={() => handleBatchById(anime.batchId)}
                    >
                     <div className="relative space-y-3 hover:scale-105 duration-300">
                       <div className="absolute flex items-center gap-2 top-0 p-1 bg-black/70 text-sm group-hover:opacity-0">
                         <PiTelevisionSimpleFill />
                         {anime.status}
                       </div>
         
                       <div className="absolute top-5 p-1 bg-black/60 text-sm group-hover:opacity-0">
                         {anime.type}
                       </div>
         
                       <div className="absolute flex items-center gap-2 top-1/2 right-0 p-1 bg-[#433d8b] text-xs lg:text-sm rounded-l-md group-hover:opacity-0">
                         <FaStar className="text-[orange]" />
                         {anime.score ? anime.score : "N/A"}
                       </div>
         
                       <img
                         src={anime.poster}
                         alt={anime.title}
                         className="w-full h-60 md:h-96 lg:h-96 object-cover rounded-lg group-hover:blur-[2px] group-hover:opacity-20 w-full transition-all duration-200 ease-in-out"
                         referrerPolicy='no-referrer'
                       />
                       <div className="absolute bottom-0 p-5 bg-gradient-to-t from-black w-full space-y-2 bg-gray-500/60 group-hover:opacity-0">
                         <p className="text-center text-white/90 text-sm font-medium truncate">
                           {anime.title}
                         </p>
                       </div>
         
                       {/* Group Hover Titile */}
                       <div className="absolute inset-0 opacity-0  p-4 space-y-2 group-hover:overflow-auto group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
                         <h5 className="text-xs md:text-md lg:text-md text-white font-semibold text-wrap">{anime?.title}</h5>
                         <div className="flex flex-wrap gap-1">
                             {anime.genreList.map((genre, index) => (
                               <div key={index}>
                                  <span className="text-xs font-normal text-left text-balance ">{genre.title}</span>
                               </div>
                             ))}
                         </div>
                         
                         <div className="flex flex-wrap items-center space-x-2">
                           <span className="text-xs font-normal bg-gray-600 p-1 rounded">{anime.type}</span>
                           <span className="text-xs font-normal bg-gray-600 p-1 rounded">{anime.status}</span>
                         </div>
         
                         <span className="flex items-center w-fit gap-1 text-xs bg-[#433d8b] p-1 rounded">
                             <FaStar className="text-[orange]" />
                             {anime.score ? anime.score : "N/A"}
                         </span>
                       </div>
         
         
                     </div>
                   </div>
                 ))
        ) : (
          <p>No Batch anime found</p>
        )}
      </div>

      {/* Pagination Controls should be outside of the anime list loop */}
      <div className="col-span-full">
        <PaginationControlsBatch
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default AllBatch;
