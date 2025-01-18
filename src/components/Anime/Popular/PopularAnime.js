import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPopularAnime } from "../../../utils/AnimeApi";
import { FaStar } from "react-icons/fa";
// Import Swiper React component
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "../../../style/SwiperNav.css";
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

const PopularAnime = () => {
  const navigate = useNavigate();
  const [popularAnime, setPopularAnime] = useState([]);

  const handlePopularClick = (id) => {
    navigate(`/anime/${id}`);
  };

  const fetchPopularAnime = async () => {
    try {
      const response = await getPopularAnime();
      setPopularAnime(response.data.animeList);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchPopularAnime();
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={6} // Menampilkan 5 item per slide
        spaceBetween={30} // Jarak antar item dalam slide
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          1024: {
            slidesPerView: 6,
            spaceBetween: 25,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        }}
        className="mySwiper"
      >
        {!!popularAnime.length ? (
          popularAnime.map((anime) => (
            <SwiperSlide key={anime.animeId}>
              <div
                className="relative group "
                onClick={() => handlePopularClick(anime.animeId)}
              >
                <div className="relative space-y-3 hover:scale-105 duration-300">
                  <div className="absolute top-0 p-1 bg-black/60 text-xs">
                    {anime.status}
                  </div>

                  <div className="absolute flex items-center gap-2 top-1/2 right-0 p-1 bg-[#433d8b] text-xs lg:text-sm">
                    <FaStar className="text-[orange]" />
                    {anime.score || "Rating Uknown"}
                  </div>

                  <img
                    src={anime.poster}
                    alt={anime.title}
                    className="w-96 lg:w-full h-64 lg:h-80 object-cover rounded-lg"
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute bottom-0 p-5 bg-gradient-to-t from-black w-full space-y-2 ">
                    <p className="text-center text-white/90 text-sm font-medium truncate">
                      {anime.type}
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

export default PopularAnime;
