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
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-2 md:grid-cols-3 gap-2 bg-[#222222]">
        {batchAnime.length ? (
          batchAnime.map((anime) => (
            <div
              key={anime.batchId}
              className="flex flex-col md:flex-row gap-5 p-4 rounded-lg "
              onClick={() => handleBatchClick(anime.batchId)}
            >
              <img
                src={anime.poster}
                alt={anime.title}
                className="w-full md:w-40 h-24 object-cover rounded-lg"
                referrerPolicy="no-referrer"
              />

              <div className="space-y-3 ">
                <h1 className="font-normal truncate">{anime.title}</h1>
                <div className="flex items-center gap-2 text-sm">
                  <PiTelevisionSimpleFill />
                  Episode: {anime.episodes}
                </div>
                <div className="flex items-center gap-2 text-sm md:text-md">
                  <FaCalendarAlt/>
                  <p className="flex items-center gap-1">
                    <span className="hidden md:block">Released On :</span>
                    {anime.releasedOn}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No Batch anime found</p>
        )}
      </div>
    </div>
  );
};

export default BatchAnime;
