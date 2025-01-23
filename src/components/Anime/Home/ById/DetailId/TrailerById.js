import React from 'react';

const TrailerById = ({ trailers }) => {
  return (
    <div className='w-full container mx-auto text-white mt-5 p-4 bg-[#222222] rounded-lg'>
      {trailers ? (
        <div>
          <iframe
            loading='lazy'
            className='w-full aspect-video object-cover rounded-lg'
            src={trailers} // gunakan trailer langsung
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div>No trailer available</div>
      )}
    </div>
  );
};

export default TrailerById;
