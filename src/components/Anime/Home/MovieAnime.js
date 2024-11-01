import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieAnime = ({ movieAnime = [] }) => {
  const navigate = useNavigate();
  const handleAnimeById = (id) => {
    navigate(`/anime/${id}`);
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-3 gap-6">
        {movieAnime.map((anime) => (
          <div key={anime.animeId} onClick={() => handleAnimeById(anime.animeId)} className="flex items-center gap-4 cursor-pointer">
            <img
              src={anime.poster}
              alt={anime.title}
              className="w-1/3 object-cover rounded-lg"
              referrerPolicy="no-referrer"
            />
            <div className="w-1/2 space-y-1">
              {/* Truncate pada judul anime */}
              <h1 className="text-sm font-medium">{anime.title}</h1>

              <div className="flex items-center gap-2">
                {/* Bungkus genre dalam satu container dan truncate */}
                <p className="text-xs text-gray-500 truncate">
                  <span className="font-normal text-white mr-2">Genres :</span>
                  {anime.genreList.map((genre, index) => (
                    <span key={genre.genreId}>
                      {genre.title}
                      {index < anime.genreList.length - 1 && ', '}
                    </span>
                  ))}
                </p>
              </div>

              <span className="font-normal text-white/70 text-xs">
                {anime.releaseDate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieAnime;
