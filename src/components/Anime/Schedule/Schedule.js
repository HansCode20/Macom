import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRilisSchedule } from "../../../utils/AnimeApi";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import '../../../style/LoaderDetails.css';

const Schedule = () => {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState([]);
  const [activeDay, setActiveDay] = useState(null); 
  const [loading, setLoading] = useState(false);

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const response = await getRilisSchedule();
      const sortedSchedule = response.data.days.sort((a, b) => {
        const dayIndexA = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].indexOf(a.day);
        const dayIndexB = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].indexOf(b.day);
        return dayIndexA - dayIndexB;
      })
      setSchedule(sortedSchedule);  
      setLoading(false);
    } catch (error) {
      console.log(error);
    } 
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  useEffect(() => {
    if (schedule.length > 0) {
      const mondayIndex = schedule.findIndex((day) => day.day === "Monday")
      if (mondayIndex !== -1) {
        setActiveDay(mondayIndex)
      }
    }
  }, [schedule])

  const handleDayClick = (dayIndex) => {
    setActiveDay(dayIndex === activeDay ? [0] : dayIndex)
  };

  const handleAnimeById = (id) => {
    navigate(`/anime/${id}`)
  }

  if (loading) {
    return (
      <div className="loadingtext flex justify-center items-center h-screen">
        <p>Loading..</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 cursor-pointer">
      <div className="flex flex-wrap justify-center space-x-2 gap-2">
        {schedule.map((animeday, dayIndex) => (
          <button 
          key={dayIndex}
          onClick={() => handleDayClick(dayIndex)}
          className={`px-4 py-2 font-medium ${
          activeDay === dayIndex ? "bg-black" : "bg-gray-700 hover:bg-gray-600"
          }`}
          >
            {animeday.day}
          </button>
        ))}
      </div>

      
      {activeDay !== null && (
        <div className="mt-6 space-y-2 p-4">
          <h2 className="text-xl font-semibold text-gray-200 text-center bg-[#17153B] p-2">
            {schedule[activeDay].day} Anime
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
            {schedule[activeDay].animeList.map((anime) => (
                  <div key={anime.animeId} className="relative group" onClick={() => handleAnimeById(anime.animeId)}>
                  <div className="relative space-y-3 hover:scale-105 duration-300">
                    <div className="absolute flex items-center gap-2 top-0 p-1 bg-black/70 text-sm ">
                      <PiTelevisionSimpleFill /> 
                      {anime.estimation}
                    </div>
    
                    <div className="absolute flex items-center gap-2 top-1/2 right-0 p-1 bg-[#433d8b] text-xs lg:text-sm">
                      <FaStar className="text-[orange]" />
                      {anime.score || "Rating Uknown"}
                    </div>
    
                    <img
                      src={anime.poster}
                      alt={anime.title}
                      className="w-full md:h-80 lg:h-80 object-cover rounded-lg"
                      referrerPolicy='no-referrer'
                    />
                    <div className="absolute bottom-0 p-2 bg-gradient-to-t from-black w-full space-y-2 ">
                      <p className="text-center text-white/90 text-lg font-medium truncate">
                        {anime.type}
                      </p>
                    </div>

                  </div>

                  <div className="mt-3">
                    <p className="text-xs text-left text-wrap">{anime.title}</p>
                  </div>
                </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
