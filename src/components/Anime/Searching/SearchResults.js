import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getSearchAnime } from '../../../utils/AnimeApi';
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = searchParams.get("query");
  
  useEffect(() => {
    console.log("Query dari URL:", query); // Cek apakah query masuk
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
  }

    const fetchSearchResults = async () => {
      setLoading(true); // Mulai loading sebelum fetch
      try {
        const response = await getSearchAnime(query); // Panggil API
        const animeList = response?.data?.animeList || [];
        setResults(animeList); // Update hasil
      } catch (error) {
        if (error.response?.status === 404) {
          setResults([]); // Set kosong jika 404
        } else {
          console.error("Failed to fetch search results", error);
        }
      } finally {
        setLoading(false); // Akhiri loading
      }
    };

    // Debounce query dengan timer
    const timer = setTimeout(fetchSearchResults, 1000);

    // Membersihkan timer saat komponen di-unmount atau query berubah
    return () => clearTimeout(timer);
  }, [query]);

  const handleButtonId = (id) => {
    navigate(`/anime/${id}`)
  }


  
  return (
    <div className='p-10'>
      {loading ? (
        <div className='flex justify-center items-center fixed inset-0 bg-gray-800 bg-opacity-50'>
          <p className='text-white text-md'>Searching...</p>
        </div>
      ) : (
        <div className='grid grid-cols-2 lg:grid-cols-6 gap-6 mt-20 cursor-pointer'>
          {results && results.length > 0 ? (
            results.map((anime) => (
              <div 
              key={anime.animeId} 
              className="relative overflow-hidden group cursor-pointer"
              onClick={handleButtonId}
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
                  referrerPolicy="no-referrer"
                />

                <div className="absolute bottom-0 p-5 bg-gradient-to-t from-black w-full space-y-2 bg-gray-500/60 group-hover:opacity-0">
                  <p className="text-center text-white/90 text-sm font-medium truncate">
                    {anime.title}
                  </p>
                </div>

                <div className="absolute inset-0 opacity-0 p-4 space-y-2 group-hover:overflow-auto group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
                  <h5 className="text-xs md:text-md lg:text-md text-white font-semibold text-wrap">{anime?.title}</h5>
                  <div className="flex flex-wrap gap-1">
                    {anime.genreList.map((genre, index) => (
                      <div key={index}>
                        <span className="text-xs font-normal text-left text-balance">{genre.title}</span>
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
            <p className='text-center text-gray-500 col-span-full'>
              No results found for "{query}"
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
