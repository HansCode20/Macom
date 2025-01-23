import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnimesById } from "../../../../utils/AnimeApi";
import DetailsAnimeById from "./DetailId/DetailsAnimeById";
import TrailerById from "./DetailId/TrailerById";
import EpisodesList from "./DetailId/EpisodesList";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import '../../../../style/LoaderDetails.css';

const AnimeById = () => {
  const { id, episodeId } = useParams();
  const [animeId, setAnimeId] = useState(null); 
  const [trailer, setTrailer] = useState("");
  const [ episodeList, setEpisodeList ] = useState([]);

  const fetchAnimesById = async () => {
    try {
      const response = await getAnimesById(id, episodeId);
      setAnimeId(response.data);
      setTrailer(response.data.trailer);
      setEpisodeList(response.data.episodeList);
    } catch (error) {
      console.log(error, "Error fetching Anime by Id");
    }
  };

  useEffect(() => {
    fetchAnimesById();
  }, [id, episodeId]);

  const calculateStarRating = (rating) => {
    let stars = [];
    const scaledRating = rating / 2; // Convert rating scale from 10 to 5

    for (let i = 1; i <= 5; i++) {
      if (scaledRating >= i) {
        stars.push(<FaStar key={i} className="text-yellow-400" />); // Full star
      } else if (scaledRating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />); // Half star
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />); // Empty star
      }
    }

    return stars;
  };
  
  return (
    <div className="mt-20">
      {animeId ? (
       <div className="w-full">
       {/* Background Blur */}
       <div className="relative w-full h-96">
         <img
           src={animeId.poster}
           alt={animeId.title}
           referrerPolicy="no-referrer"
           className="w-full h-full object-cover filter blur-lg brightness-50"
         />
       </div>
     
       {/* Foreground Content */}
       <div className="relative -mt-96 lg:-mt-48 z-10 p-5 flex flex-col md:flex-col lg:flex-row  justify-center items-center gap-5 ">
          <div className="space-y-5">
           <h1 className="text-white text-xl font-bold text-center block md:block lg:hidden">{animeId.title}</h1>
            <img
              src={animeId.poster}
              alt={animeId.title}
              referrerPolicy="no-referrer"
              className="w-96  h-96 object-contain shadow-lg mx-auto"
              />
            <div className="text-center w-9/12 mx-auto bg-gray-800/60 p-3 rounded-lg">
              {animeId.score.value || 'N/A'} / <i>{animeId.score.users}</i>
              <span className="flex justify-center items-center space-x-1">
                {!animeId.score.value ? (
                  <p className="text-white">N/A</p>
                ) : (
                  calculateStarRating(animeId.score.value)
                )}
              </span>
            </div>
          </div>

          <div className="w-full md:w-full lg:w-1/2 space-y-5 md:p-5">
           <h1 className="text-white text-xl font-bold text-center md:text-left hidden md:hidden lg:block">{animeId.title}</h1>
                {animeId.synopsis.paragraphs.length > 0 ? (
                    animeId.synopsis.paragraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))
                ) : (
                  <p className="text-white">Detail paragraph Uknown</p>
                )}
              <div className="flex flex-wrap gap-3">
                {animeId.genreList.length > 0 ? (
                    animeId.genreList.map((genre) => (
                      <span
                        key={genre.genreId}
                        className="bg-[#433d8b] px-3 py-1 rounded-lg font-medium text-white"
                      >
                        {genre.title}
                      </span>
                    ))
                  ) : (
                    <p className="text-white">Loading Genre...</p>
                  )}
              </div>
          </div>


         </div>

          <div className="lg:mt-18 mb-10 p-3">
             <DetailsAnimeById
               title={animeId.title}
               relesased={animeId.aired}
               duration={animeId.duration}
               totalEpisodes={animeId.episodes}
               english={animeId.english}
               japanese={animeId.japanese}
               producers={animeId.producers}
               seasons={animeId.season}
               source={animeId.source}
               status={animeId.status}
               studios={animeId.studios}
               synonyms={animeId.synonyms}
               type={animeId.type}
             />

              <TrailerById
                trailers={trailer}
              />

              <EpisodesList
                episodeLists={episodeList}
              />

          </div>


     </div>
     
      ) : (
        <div className="loadingtext flex justify-center items-center h-screen">
          <p>Loading Anime Details</p>
        </div>
      )}
    </div>
  );
};

export default AnimeById;
