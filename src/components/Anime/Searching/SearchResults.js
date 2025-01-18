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
    if (query) {
      const fetchSearchResults = () => {
        setLoading(true);
        try {
          setTimeout(async () => {
            const response = await getSearchAnime(query);
            setResults(response.data.animeList);
            setLoading(false);
          }, 1000);
        } catch (error) {
          console.error("Failed to fetch search results", error);
          setLoading(false);
        }
      };

      fetchSearchResults();
    }
  }, [query]);

  return (
    <div className='p-10'>
      {loading ? (
        <div className='flex justify-center items-center fixed inset-0 bg-gray-800 bg-opacity-50'>
          <p className='text-white text-md'>Searching...</p>
        </div>
      ) : (
        <div className='grid grid-cols-2 lg:grid-cols-6 gap-6'>
          {results && results.length > 0 ? (
            results.map((anime) => (
              <div
                key={anime.animeId}
                className="relative group cursor-pointer"
                onClick={() => navigate(`/anime/${anime.animeId}`)}
              >
                <div className="relative space-y-3 hover:scale-105 duration-300">
                  <div className="absolute flex items-center gap-2 top-0 p-1 bg-black/70 text-sm">
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
            <p className='text-center text-gray-500 col-span-full'>
              No results found
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
