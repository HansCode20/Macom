import React, { useEffect, useState } from "react";
import { getAnimes } from "../../../utils/AnimeApi";
import { useNavigate } from "react-router-dom";
import '../../../style/LoaderDetails.css';

const AnimeList = () => {
  const navigate = useNavigate()
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAnimeList = async () => {
    setLoading(true);
    try {
      const response = await getAnimes();
      setAnimeList(response.data.list);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeList();
  }, []);

  const handleAnimeById = (id) => {
    navigate(`/anime/${id}`)
  };

  if (loading) {
    return (
      <div className="loadingtext flex justify-center items-center h-screen">
        <p>Loading..</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5 space-y-10 bg-black text-white mt-20">
      {animeList.map((animegroup, groupIndex) => (
        <div key={groupIndex}>
          <h2 className="font-semibold text-3xl text-gray-100">
            {animegroup.startWith}
          </h2>
          <hr className="border-gray-500 my-4" />
          <ul className="list-disc grid grid-cols-1 lg:grid-cols-2 gap-4 pl-10">
            {animegroup.animeList.map((anime) => (
              <li
                key={anime.animeId}
                className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
                onClick={() => handleAnimeById(anime.animeId)}
              >
                {anime.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AnimeList;
