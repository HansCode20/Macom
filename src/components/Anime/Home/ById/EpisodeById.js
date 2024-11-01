    import React, { useState, useEffect } from 'react';
    import { replace, useNavigate, useParams } from 'react-router-dom';
    import { getEpisodeById, getServerId } from '../../../../utils/AnimeApi';
    import ServerId from '../../Server/ServerId';
    import EpisodeDownloadUrl from './EpisodeById/EpisodeDownloadUrl';
    import EpisodeNavigation from './EpisodeById/EpisodeNavigation';
    import { FaPlay } from "react-icons/fa";

    const EpisodeById = () => {
        const { id } = useParams();
        const navigate = useNavigate(); // useNavigate untuk navigasi
        const [episode, setEpisode] = useState(null);
        const [frameUrl, setFrameUrl] = useState(null);
        const [activeServer, setActiveServer] = useState(null);
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

        const handleNavigation = (episodeId) => {
            fetchEpisodeById(episodeId); // Fetch new episode data when navigating
            navigate(`/anime/episode/${episodeId}`);
        };

        // Initial fetch of the episode when component mounts
        useEffect(() => {
            fetchEpisodeById(id);
        }, [id]); // Only `id` in the dependency array
        
        return (
            <div className='container mx-auto p-5'>
                {loading ? (
                    <div className="loadingtext flex justify-center items-center h-screen">
                        <p>Loading..</p>
                    </div>
                ) : episode ? (
                    <div>
                        <div className='flex flex-col lg:flex-row space-y-10'>
                            <div className='w-full lg:w-1/2'>
                                <h1 className='text-lg md:text-2xl text-center md:text-left font-semibold'>
                                    {episode.title}
                                </h1>
                                {episode.server.qualities
                                    .filter((server) => server.title !== 'unknown' && server.serverList && server.serverList.length > 0)
                                    .map((server) => (
                                        <div key={server.serverId}>
                                            <p className='mt-5 mb-2 font-medium text-gray-300'>{server.title}</p>
                                            <div className='grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-5'>
                                                {server.serverList.map((servers) => (
                                                    <button 
                                                        key={servers.serverId}  
                                                        onClick={() => fetchServerUrl(servers.serverId)}
                                                        className={`flex items-center gap-2 text-xs px-3 py-1 bg-gray-900 rounded ${activeServer === servers.serverId ? 'text-white' : 'text-gray-500'}`}
                                                    >
                                                        <FaPlay />
                                                        {servers.title}
                                                    </button>
                                                ))} 
                                            </div>
                                        </div>
                                    ))}
                            </div>
        
                            <div className='w-full lg:w-1/2'>
                                <ServerId 
                                    frameUrl={frameUrl}
                                    activeServer={activeServer}
                                    loadingFrm={loadingFrame}
                                />
                            </div>
                        </div>
        
                        <EpisodeNavigation
                            hasPrevEpisode={episode.hasPrevEpisode}
                            hasNextEpisode={episode.hasNextEpisode}
                            prevEpisodeId={episode.prevEpisode?.episodeId}
                            nextEpisodeId={episode.nextEpisode?.episodeId}
                            handleNavigation={handleNavigation} 
                        />
        
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-screen">
                        <p>Episode not found.</p>
                    </div>
                )}
        
                <div>
                    <EpisodeDownloadUrl
                        downloadUrls={downloadUrl}
                    />
                </div>
            </div>
        );
    };

    export default EpisodeById;
