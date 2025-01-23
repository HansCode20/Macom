import React from 'react';
import { useNavigate } from 'react-router-dom';
const EpisodesList = ({ episodeLists }) => {
  const navigate = useNavigate();

  const handleEpisodeClick = (episodeId) => {
    navigate(`/episode/${episodeId}`);
  };

  return (
    <div className="w-full max-h-96 overflow-y-auto container mx-auto mt-5  bg-[#222222] rounded-lg lg:p-5">
      {episodeLists && episodeLists.length > 0 ? (
        episodeLists.map((listVideo) => (
          <div key={`${listVideo.episodeId} - ${listVideo.title}`} className="flex gap-5 items-center m-5 border-b border-gray-700 p-2 cursor-pointer" onClick={() => handleEpisodeClick(listVideo.episodeId)}>
           {listVideo.title ? (
               <span className="block p-2 bg-[#2E236C] w-12 text-center rounded-md">
                 {listVideo.title}
               </span>
           ) : (
               <span className=" hidden block p-2 bg-[#2E236C] w-12 text-center rounded-md">
                 {listVideo.episodeId}
               </span>  
           )}
            <span className='text-xs md:text-lg'>
              {listVideo.episodeId}
            </span>
          </div>
        ))
      ) : (
        <p className="text-white">Not Found Episode List</p>
      )}
    </div>
  );
};

export default EpisodesList;
