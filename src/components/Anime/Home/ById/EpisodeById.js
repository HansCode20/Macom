    import React, { useState, useEffect } from 'react';
    import {  useNavigate, useParams } from 'react-router-dom';
    import { getEpisodeById, getServerId, getPopularAnime } from '../../../../utils/AnimeApi';
    import ServerId from '../../Server/ServerId';
    import EpisodeDownloadUrl from './EpisodeById/EpisodeDownloadUrl';
    import EpisodeNavigation from './EpisodeById/EpisodeNavigation';
  

    const EpisodeById = () => {
        const { id } = useParams();
        const navigate = useNavigate(); // useNavigate untuk navigasi
        const [episode, setEpisode] = useState(null);
        const [frameUrl, setFrameUrl] = useState(null);
        const [activeServer, setActiveServer] = useState(null);
        const [recommendedAnime, setRecommendedAnime] = useState([]);
        const [downloadUrl, setDownloadUrl] = useState([]);
        const [loading, setLoading] = useState(false);
        const [loadingFrame, setLoadingFrame] = useState(false);

        // Fetch episode by ID and set default server URL
        const fetchEpisodeById =  () => {
            setLoading(true);
            try {
                setTimeout( async () => { 
                    const response = await getEpisodeById(id);
                    setEpisode(response.data);
                    setDownloadUrl(response.data.downloadUrl.formats);
    
                    const defaultQuality = response.data.server.qualities.find(
                        (quality) => quality.title === "360p"
                    );
    
                    if (defaultQuality && defaultQuality.serverList.length > 0) {
                        const defaultServer = defaultQuality.serverList[0];
                        fetchServerUrl(defaultServer.serverId);
                        setActiveServer(defaultServer.serverId);
                    }
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error("Error fetching episode by ID:", error);
                setLoading(false);
            }
        };

        // Fetch server URL by server ID
        const fetchServerUrl = async (serverId) => {
            setLoadingFrame(true);
            try {
                const response = await getServerId(serverId);
                setFrameUrl(response.data.url);
                setActiveServer(serverId);
                setLoadingFrame(false);
            } catch (error) {
                console.error("Error fetching URL by server ID:", error);
                setLoadingFrame(false);
            }
        };

        //Fetch Popular Anime or Recommended for you
        useEffect(() => {
            const fetchRecommendAnime = async () => {
                try {
                    const response = await getPopularAnime();
                    if (response.data && Array.isArray(response.data.animeList)) {
                        const recommendedAnime = response.data.animeList.filter(anime => anime.type === "TV" && typeof anime.title === "string" && anime.title.length < 30);
                        setRecommendedAnime(recommendedAnime);
                    }
                } catch (error) {
                    console.info(error);
                }
            };
            fetchRecommendAnime();
        }, [])

    


        const handleNavigation = (episodeId) => {
            fetchEpisodeById(episodeId); 
            navigate(`/episode/${episodeId}`);
        };

        useEffect(() => {
            fetchEpisodeById(id);
        }, [id]); 
        
        return (
            <div className='container mx-auto p-5'>
                {loading ? (
                    <div className="loadingtext flex justify-center items-center h-screen">
                        <p>Loading</p>
                    </div>
                ) : episode ? (
                    <div className='flex flex-col md:flex-row justify-evenly gap-10 mt-40'>
                        
                            <div className='flex-grow space-y-10'>
                                <h1 className='text-lg md:text-xl text-center md:text-left text-wrap font-semibold'>
                                    {episode.title}
                                </h1>

                                <div className='mt-10'>
                                    <ServerId 
                                        frameUrl={frameUrl}
                                        activeServer={activeServer}
                                        loadingFrm={loadingFrame}
                                    />
                                </div>

                                <div className='flex flex-wrap gap-5'>
                                    {episode.server.qualities
                                    .filter((server) => server.title !== 'unknown' && server.serverList && server.serverList.length > 0)
                                    .map((server) => (
                                        <div key={server.serverId} className="mt-5">
                                            <select
                                                onChange={(e) => fetchServerUrl(e.target.value)}
                                                className="text-xs bg-gray-800 rounded-lg p-2 outline-none"
                                        >
                                                <option className='text-center text-xs' disabled selected>
                                                    {server.title}
                                                </option>
                                                {server.serverList.map((servers) => (
                                                    <option key={servers.serverId} value={servers.serverId}  >
                                                        {servers.title}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
                                </div>        

                                <EpisodeNavigation
                                    hasPrevEpisode={episode.hasPrevEpisode}
                                    hasNextEpisode={episode.hasNextEpisode}
                                    prevEpisodeId={episode.prevEpisode?.episodeId}
                                    nextEpisodeId={episode.nextEpisode?.episodeId}
                                    handleNavigation={handleNavigation} 
                                />

                                <EpisodeDownloadUrl
                                    downloadUrls={downloadUrl}
                                />
                           </div>

                           <div>
                                <h1 className='text-lg font-semibold'>Recommended Anime</h1>
                                {recommendedAnime.length  && recommendedAnime.length > 0 ?  (
                                   recommendedAnime.map((anime) => (
                                    <div key={anime.animeId} className="flex gap-5 mt-8 cursor-pointer" onClick={() => navigate(`/${anime.animeId}`)}>
                                        <div className='relative'>
                                            <img src={anime.poster} alt={anime.title} className="w-40 aspect-[16/9] object-cover rounded-lg"/>
                                            <div className='absolute bottom-0 text-right w-full bg-gradient-to-t from-black p-1  text-gray-200 font-semibold'>{anime.status}</div>
                                        </div>

                                        <div>
                                            <h3 className='text-sm text-wrap font-semibold'>{anime.title}</h3>
                                            <span className='text-xs text-wrap text-gray-400'>{anime.type}</span>
                                        </div>
                                    </div>
                                ))
                                ) : (
                                    <p className="text-white">Not Found Anime</p>
                                )}
                          </div>
        
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-screen">
                        <p>Episode not found.</p>
                    </div>
                )}
        
            </div>
        );
    };

    export default EpisodeById;
