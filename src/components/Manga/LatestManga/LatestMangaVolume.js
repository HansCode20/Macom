import React from 'react';

// React Icons
import { PiFilmSlate } from "react-icons/pi";

const LatestMangaVolume = ({latestUpdatesVolume = []}) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5'>
        {latestUpdatesVolume && latestUpdatesVolume.length ? (
            latestUpdatesVolume.map((volume, index) => (
                <div 
                 key={volume.id}
                 className={`${index === 4 || index === 5 ? 'col-span-2' : 'col-span-1'} relative overflow-hidden group`}
                 >

                    <img 
                     src={volume.poster} 
                     alt={volume.title} 
                     className='w-96 lg:w-full h-64 opacity-80 object-cover  group-hover:blur-[2px] w-full  transition-all duration-200 ease-out'
                    />

                    <div className='absolute inset-0 p-5 group-hover:overflow-auto group-hover:bg-opacity-80 group-hover:bg-black transition-all duration-200 ease-out'>
                         <h1 className='absolute top-0 left-0 w-1/2 group-hover:hidden bg-black/70 text-lg text-white/70 font-semibold truncate'>{volume.title}</h1>
                            <div className='opacity-0 group-hover:opacity-100 transition-opacity space-y-2 '>
                                <h1 className='text-lg text-white text-wrap'>{volume.title}</h1>
                                    <div className='flex space-x-5'>
                                        {volume.languages.map((languageArray, index) => (
                                            <div key={index} className='flex space-x-2'>
                                                {languageArray.map((language, index) => (
                                                    <p key={index} className='text-sm text-gray-400'>{language}</p>
                                                 ))}
                                            </div>
                                        ))}
                                    </div>

                                    <div className='flex items-center gap-1 p-2 bg-black/70 w-fit rounded text-sm '>
                                        <PiFilmSlate/>
                                        {volume.totalvolumes}
                                        <span>Volume</span>
                                    </div>
                            </div>
                    </div>

                </div>
            ))
        ) : (
            <p>Failed to load Volume Manga</p>
        )}
    </div>
  )
}

export default LatestMangaVolume;