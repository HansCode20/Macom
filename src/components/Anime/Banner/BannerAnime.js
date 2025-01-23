import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CiPlay1 } from "react-icons/ci";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

const BannerAnime = ({ BannerAnime = {} }) => {
  const navigate = useNavigate();

  const handleBannerClick = (id) => {
    navigate(`/anime/${id}`);
  };

  return (
    <>
       <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
       >
          {!!BannerAnime.length ? (
            BannerAnime.map((Banner) => (
            <SwiperSlide key={Banner.animeId}>
              <div className="relative w-full text-white bg-[#222222] rounded-lg overflow-hidden">
                {/* Background Image with Gradient Overlay */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent z-20"></div>
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg z-20"></div>
                  {/* Image */}
                  <img
                    src={Banner.poster}
                    alt="BannerAnime"
                    className="w-full h-full md:h-[800px] lg:h-[800px] object-cover rounded-lg blur-sm"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-2 md:bottom-10 left-4 md:left-10 lg:left-10 p-5 z-20 space-y-2 md:space-y-5 lg:space-y-5">
                  {/* Title */}
                  <h1 className="text-sm md:text-2xl lg:text-2xl font-bold  text-white/90">{Banner.title || 'Unknown Title'}</h1>

                  {/* Genre List */}
                  <div className="mt-2 flex flex-wrap ">
                    {Banner.genreList && Banner.genreList.length > 0 ? (
                      Banner.genreList.map((genre) => (
                        <span
                          key={genre.genreId}
                          className="text-xs md:text-sm lg:text-sm font-medium bg-gray-800 p-2 rounded-lg mr-2 "
                        >
                          {genre.title}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-400">No genres available</span>
                    )}
                  </div>

                  <div className='text-sm md:text-sm lg:text-sm font-semibold'>{Banner.releaseDate}</div>

                  <button 
                  className='flex items-center space-x-5 bg-gray-500 hover:bg-white w-fit rounded-full px-4 py-2 mt-2 transition-all duration-300'
                  onClick={() => handleBannerClick(Banner.animeId)}
                  >
                      <CiPlay1 className='text-black text-xl'/>
                      <span className='font-semibold text-black'>Play</span>
                  </button>

                </div>
              </div>
            </SwiperSlide>
            ))
            ) : (
              <div className="text-center text-gray-500">No banner available</div>
            )}
       </Swiper>
    </>
  );
};

export default BannerAnime;
