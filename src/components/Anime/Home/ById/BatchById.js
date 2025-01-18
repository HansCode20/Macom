import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBatchAnimeById } from "../../../../utils/AnimeApi";
import DetailsBatchById from "../ById/BatchById/DetailsBatchById";
import EpisodesList from "./DetailId/EpisodesList";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import BatchDownload from "./BatchById/BatchDownload";

const AnimeById = () => {
  const { id } = useParams();
  const [batchId, setBatchId] = useState(null); 
  const [batchDownload, setBatchDownload] = useState([]);

  const fetchBatchById = async () => {
    try {
      const response = await getBatchAnimeById(id);
      setBatchId(response.data);
      setBatchDownload(response.data.downloadUrl.formats);
    } catch (error) {
      console.log(error, "Error fetching Anime by Id");
    }
  };

  useEffect(() => {
    fetchBatchById();
  }, [id]);

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
    <div>
      {batchId ? (
       <div className="w-full">
       {/* Background Blur */}
       <div className="relative w-full h-96">
         <img
           src={batchId.poster}
           alt={batchId.title}
           referrerPolicy="no-referrer"
           className="w-full h-full object-cover filter blur-lg brightness-50"
         />
       </div>
     
       {/* Foreground Content */}
       <div className="relative -mt-96 lg:-mt-48 z-10 p-5 flex flex-col md:flex-col lg:flex-row  justify-center items-center gap-5 ">
          <div className="space-y-5">
           <h1 className="text-white text-xl font-bold text-center block md:block lg:hidden">{batchId.title}</h1>
            <img
              src={batchId.poster}
              alt={batchId.title}
              referrerPolicy="no-referrer"
              className="w-96  h-96 object-contain shadow-lg mx-auto"
              />
            <div className="text-center w-9/12 mx-auto bg-gray-800/60 p-3 rounded-lg">
              {batchId.score|| 'N/A'} / 10
              <span className="flex justify-center items-center space-x-1">
                {!batchId.score ? (
                  <p className="text-white">N/A</p>
                ) : (
                  calculateStarRating(batchId.score)
                )}
              </span>
            </div>
          </div>

          <div className="w-full md:w-full lg:w-1/2 space-y-5 md:p-5">
           <h1 className="text-white text-xl font-bold text-center md:text-left hidden md:hidden lg:block">{batchId.title}</h1>
                {batchId.synopsis.paragraphs.length > 0 ? (
                    batchId.synopsis.paragraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))
                ) : (
                  <p className="text-white">Detail paragraph Unknown</p>
                )}
              <div className="flex flex-wrap gap-3">
                {batchId.genreList.length > 0 ? (
                    batchId.genreList.map((genre) => (
                      <span
                        key={genre.genreId}
                        className="bg-blue-800 px-3 py-1 rounded-lg font-medium text-white"
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
             <DetailsBatchById
               title={batchId.title}
               released={batchId.releasedOn}
               duration={batchId.duration}
               totalEpisodes={batchId.episodes}
               english={batchId.english}
               japanese={batchId.japanese}
               producers={batchId.producers}
               seasons={batchId.season}
               source={batchId.source}
               status={batchId.status}
               studios={batchId.studios}
               synonyms={batchId.synonyms}
               type={batchId.type}
             />

             <BatchDownload
              downloadUrls={batchDownload}
             />

          </div>
     </div>
      ) : (
        <p className="flex justify-center items-center h-screen">Loading batch anime details...</p>
      )}
    </div>
  );
};

export default AnimeById;
