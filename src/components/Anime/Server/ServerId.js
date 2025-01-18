import React from 'react'

const ServerId = ({frameUrl, loadingFrm}) => {
  return (
    <div className='w-full h-full'>
      {loadingFrm ? (
        <div className="animate-pulse bg-black w-full h-64 md:h-96 lg:h-96 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : frameUrl ? (
        <iframe
          src={frameUrl}
          title="Video Player"
          className="w-full h-64 md:h-96 lg:h-96 rounded-lg"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      ) : (
        <div className="bg-black w-full h-64 md:h-96 lg:h-96 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">choose your video quality</p>
        </div>
      )}
    </div>
  );
};

export default ServerId;