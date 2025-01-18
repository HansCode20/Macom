import React from "react";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BatchAnime = ({ batchAnime = [] }) => {
  const navigate = useNavigate();

  const handleBatchClick = (id) => {
    navigate(`/anime/batch/${id}`);
  };

  return (
      <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 gap-2 bg-[#222222]">
        {batchAnime.length ? (
          batchAnime.map((anime) => (
            <div
              key={anime.batchId}
              className="gap-5 p-4 rounded-lg "
              onClick={() => handleBatchClick(anime.batchId)}
            >
              <div className="relative">
                <img
                  src={anime.poster}
                  alt={anime.title}
                  className="w-96 lg:w-full h-64 lg:h-96 object-cover rounded-lg"
                  referrerPolicy="no-referrer"
                />

                  <div className="absolute bottom-0 p-5 w-full bg-gradient-to-t from-black  ">
                    <p className="text-center text-sm font-medium text-white/90">
                      {anime.episodes}
                    </p>
                  </div>

                  <div className="absolute top-0 p-1 bg-black/60 text-sm md:text-md">
                      {anime.releasedOn}
                  </div>
              </div>

              <div className="mt-3">
                <p className="text-xs text-wrap text-left">{anime.title}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No Batch anime found</p>
        )}
      </div>
  );
};

export default BatchAnime;
