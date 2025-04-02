import React from "react";
import { useNavigate } from "react-router-dom";
// Import Swiper React component
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "../../../style/SwiperNav.css";
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

const RecentAnime = ({ recentAnime = [] }) => {
  const navigate = useNavigate();

  const handleRecentClick = (id) => {
    navigate(`/anime/${id}`);
  };

  return (
    <>
      <Swiper
        slidesPerView={6} // Menampilkan 5 item per slide
        spaceBetween={30} // Jarak antar item dalam slide
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          1024 : {
            slidesPerView : 6,
            spaceBetween : 25
          },
          768 : {
            slidesPerView : 4,
            spaceBetween : 10
          },
          0 : {
            slidesPerView : 2,
            spaceBetween : 10
          }
        }}
        className="mySwiper"
      >
        {!!recentAnime.length ? (
          recentAnime.map((anime) => (
            <SwiperSlide key={anime.episodeId}>
              <div
                className="relative group cursor-pointer"
                onClick={() => handleRecentClick(anime.animeId)}
              >

                <div className="relative space-y-3 hover:scale-105 duration-300">

                  <div className="absolute top-0 p-1 bg-black/60 text-xs">
                    {anime.releasedOn}
                  </div>

                  <img
                    src={anime.poster}
                    alt={anime.title}
                    className="w-96 lg:w-full h-64 lg:h-80 object-cover rounded-lg"
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute bottom-0 p-5 bg-gradient-to-t from-black w-full space-y-2 ">
                    <p className="text-center text-white/90 text-sm font-medium truncate">
                      Episode {anime.episodes}
                    </p>
                  </div>


                </div>
                
                  <div className="mt-3">
                    <p className="text-xs text-left text-wrap">{anime.title}</p>
                  </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p>No completed anime found</p>
        )}
      </Swiper>
    </>
  );
};

export default RecentAnime;
