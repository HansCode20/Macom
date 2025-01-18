import React from 'react';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

const EpisodeNavigation = ({ hasPrevEpisode, hasNextEpisode, prevEpisodeId, nextEpisodeId, handleNavigation }) => {
    return (
        <div className='flex justify-between items-center mt-10'>
            <button
                className={`bg-[#433D8B] text-white font-bold py-2 px-4 rounded ${hasPrevEpisode ? 'hover:bg-gray-600 transition-all duration-200' : 'opacity-50'}`}
                onClick={() => handleNavigation(prevEpisodeId)}
                disabled={!hasPrevEpisode}
            >
                <IoMdArrowRoundBack />
            </button>
            <button
                className={`bg-[#433D8B] text-white font-bold py-2 px-4 rounded ${hasNextEpisode ? 'hover:bg-gray-600 transition-all duration-200' : 'opacity-50'}`}
                onClick={() => handleNavigation(nextEpisodeId)}
                disabled={!hasNextEpisode}
            >
                <IoMdArrowRoundForward />
            </button>
        </div>
    );
};

export default EpisodeNavigation;
