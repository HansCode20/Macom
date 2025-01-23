import React from 'react';

// React Icons
import { PiFilmSlate } from "react-icons/pi";

// Import Swiper React component
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "../../../style/SwiperNav.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation } from "swiper/modules";

const LatestManga = ( { latestUpdatesChapter = [] }) => {

  return (
    <>
    <Swiper
      slidesPerView={4} // Menampilkan 5 item per slide
      spaceBetween={30} // Jarak antar item dalam slide
      navigation={true}
      modules={[Navigation]}
      breakpoints={{
        1024: {
          slidesPerView: 4,
          spaceBetween: 20,
          slidesPerGroup: 4,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 10,
          slidesPerGroup: 4,
        },
        0: {
          slidesPerView: 2,
          spaceBetween: 10,
          slidesPerGroup: 2,
        },
      }}
      className="mySwiper"
    >
      {!!latestUpdatesChapter.length ? (
        latestUpdatesChapter.map((manga) => (
          <SwiperSlide key={manga.id} >
            <div
              className="overflow-hidden group"
            >

              <img 
               src={manga.poster} alt={manga.title} 
               className='w-96 lg:w-full h-64 object-cover opacity-80 group-hover:blur-[2px] w-full  transition-all duration-200 ease-out'
              />

              <div className='absolute inset-0 p-5 group-hover:overflow-auto group-hover:bg-opacity-80 group-hover:bg-black transition-all duration-200 ease-out'>
                <h1 className='absolute top-0 left-0 w-1/2 group-hover:hidden bg-black/70 text-lg text-white/70 font-semibold truncate'>{manga.title}</h1>
                  <div className='opacity-0 group-hover:opacity-100 transition-opacity space-y-2 '>
                    <h1 className='text-xs md:text-lg  text-white text-wrap'>{manga.title}</h1>
                    <div className='flex space-x-5'>
                        {manga.languages.map((languageArray, index) => (
                          <div key={index} className='flex space-x-2'>
                                {languageArray.map((language, index) => (
                                    <p key={index} className='text-sm text-gray-400'>{language}</p>
                                ))}
                          </div>
                      ))}
                    </div>
                    <div className='flex items-center gap-1 p-2 bg-black/70 w-fit rounded text-xs md:text-sm'>
                      <PiFilmSlate/>
                      {manga.totalchapters}
                      <span>Chapters</span>
                    </div>
                  </div>
              </div>

             
            </div>
          </SwiperSlide>
        ))
      ) : (
        <p>No completed anime found</p>
      )}
    </Swiper>
  </>
  )
}

export default LatestManga