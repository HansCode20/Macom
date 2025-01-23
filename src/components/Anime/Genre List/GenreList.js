import React, { useEffect, useState } from "react";
import { getGenreList } from "../../../utils/AnimeApi";
import { useNavigate } from "react-router-dom";

const GenreList = () => {
  const navigate = useNavigate();
  const [genreList, setGenreList] = useState([]);

  const fetchGenresList = async () => {
    try {
      const response = await getGenreList();
      setGenreList(response.data.genreList);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchGenresList();
  }, []);

  const handleButtonId = (genreId) => {
    navigate(`/genres/${genreId}`);
  }

  return (
    <div className="flex flex-wrap gap-5 mt-20">
      {genreList &&
        genreList.map((anime) => (
            <button   
             key={anime.genreId}
             onClick={() => handleButtonId(anime.genreId)}
             className="mb-5 cursor-pointer"
             >
              <span className="border border-gray-600 p-2 rounded-md text-gray-400">{anime.title}</span>
            </button>     
        ))}
    </div>
  );
};

export default GenreList;
