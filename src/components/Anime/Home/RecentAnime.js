import React from "react";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const RecentAnime = ({ recentAnime = [] }) => {
  const navigate = useNavigate();
  
  const handleRecentClick = (id) => {
    navigate(`/anime/episode/${id}`);
  };

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-6">
        {!!recentAnime.length ? (
          recentAnime.map((anime) => (
            <div key={anime.episodeId} className="relative group" onClick={() => handleRecentClick(anime.episodeId)}>
              <div className="relative space-y-3 hover:scale-105 duration-300">
                <div className="absolute flex items-center gap-2 top-0 p-1 bg-black/70 text-sm">
                  <PiTelevisionSimpleFill />
                  Episode {anime.episodes}
                </div>

                <div className="absolute top-5 p-1 bg-black/60 text-xs">
                  {anime.releasedOn}
                </div>

                <img 
                  src={anime.poster} 
                  alt={anime.title} 
                  className="w-96 lg:w-full h-48 lg:h-80 object-cover rounded-lg"
                  referrerPolicy="no-referrer"
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
          <p>No completed anime found</p>
        )}
      </div>
    </div>
  );
};

export default RecentAnime;
