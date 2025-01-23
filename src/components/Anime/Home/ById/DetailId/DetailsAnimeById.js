import React from "react";

const DetailsAnimeById = ({
  title,
  released,
  duration,
  totalEpisodes,
  english,
  japanese,
  producers,
  seasons,
  source,
  status,
  studios,
  synonyms,
  type,
}) => {
  return (
    <div className="w-full container mx-auto  text-white mt-5 p-4 bg-[#222222] rounded-lg">
       <h1 className="text-2xl font-bold ml-2">Detail Anime {title}</h1>
       <hr className="border-gray-500 my-4"/>
       <div className="flex flex-col md:flex-row">
          <div className="flex flex-col w-full ">
            <div className="flex justify-between p-2 border-b border-gray-700">
              <span className="font-medium ">Released</span>
              <span className="max-w-xs truncate">{released || "Unknown"}</span>
            </div>
            <div className="flex justify-between p-2 border-b border-gray-700">
              <span className="font-medium">Duration</span>
              <span  className="max-w-xs truncate">{duration || "Unknown"}</span>
            </div>
            <div className="flex justify-between p-2 border-b border-gray-700">
              <span className="font-medium">Total Episodes</span>
              <span  className="max-w-xs truncate">{totalEpisodes || "Unknown"}</span>
            </div>
            <div className="flex justify-between p-2 border-b border-gray-700">
              <span className="font-medium">English</span>
              <span  className="max-w-xs truncate md:text-wrap lg:text-wrap text-right">{english || "Unknown"}</span>
            </div>
            <div className="flex justify-between p-2 border-b border-gray-700">
              <span className="font-medium">Japanese</span>
              <span  className="max-w-xs truncate md:text-wrap lg:text-wrap text-right">{japanese || "Unknown"}</span>
            </div>
            <div className="flex justify-between p-2 border-b border-gray-700 ">
              <span className="font-medium ">Producers</span>
              <span className="max-w-xs truncate md:text-wrap lg:text-wrap text-right">{producers || "Unknown"}</span>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <div className="flex justify-between p-2 border-b border-gray-700">
              <span className="font-medium">Seasons</span>
              <span  className="max-w-xs truncate">{seasons || "Unknown"}</span>
            </div>
            <div className="flex justify-between p-2 border-b border-gray-700">
              <span className="font-medium">Source</span>
              <span  className="max-w-xs truncate">{source || "Unknown"}</span>
            </div>
            <div className="flex justify-between p-2 border-b border-gray-700">
              <span className="font-medium">Status</span>
              <span  className="max-w-xs truncate">{status || "Unknown"}</span>
            </div>
            <div className="flex justify-between p-2 border-b border-gray-700">
              <span className="font-medium">Studios</span>
              <span  className="max-w-xs truncate md:text-wrap lg:text-wrap text-right">{studios}</span>
            </div>
            <div className="flex justify-between p-2 border-b border-gray-700">
              <span className="font-medium">Synonyms</span>
              <span className="max-w-xs truncate md:text-wrap lg:text-wrap text-right">{synonyms || "Unknown"}</span>
            </div>
            <div className="flex justify-between p-2 border-b border-gray-700">
              <span className="font-medium">Type</span>
              <span  className="max-w-xs truncate">{type || "Unknown"}</span>
            </div>
          </div>
       </div>
    </div>
  );
};

export default DetailsAnimeById;
