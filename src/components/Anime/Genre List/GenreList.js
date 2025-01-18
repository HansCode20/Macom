import React, { useEffect, useState } from "react";
import { getGenreList } from "../../../utils/AnimeApi";
import '../../../style/ButtonHover.css';
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
    navigate(`/anime/genres/${genreId}`);
  }

  return (
    <div className="p-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5 mt-20">
      {genreList &&
        genreList.map((anime) => (
            <button 
             id="Button-genres"
             key={anime.genreId}
             onClick={() => handleButtonId(anime.genreId)}
             >
              <span>{anime.title}</span>
            </button>     
        ))}
    </div>
  );
};

export default GenreList;
