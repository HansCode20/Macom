    import React, { useEffect, useState } from "react";
    import { useParams } from "react-router-dom";
    import { getMangaDetail } from "../../utils/Api";
    import { Link } from "react-router-dom";
    // Style Loading
    import '../../style/LoaderDetails.css';

    // React Icons
    import { FaRegEye } from "react-icons/fa";

    const MangaDetails = () => {
        const { id } = useParams();
        const [mangaDetail, setMangaDetail] = useState(null);

        useEffect(() => {
            const fetchMangaDetail = async () => {
                try {
                    const response = await getMangaDetail(id);
                    setMangaDetail(response);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchMangaDetail();
        }, [id]);

        if (!mangaDetail) {
            return (
                <div class="loadingtext flex justify-center items-center h-screen">
                    <p>Loading</p>
                </div>
            )
        }

        return (
            <div className="flex flex-col justify-center items-center mt-10 p-5 space-y-10">
                {/* BreadCrumb */}
                <div>
                    <nav className="text-sm text-white mb-4 ">
                        <Link to="/" className="hover:underline">Macom</Link> 
                        <span> &gt; </span>
                        <Link to={`/manga/${id}`} className="hover:underline">{mangaDetail.name || "Loading..."}</Link> {/* Judul manga dari API */}    
                    </nav>
                </div>


                <div className="flex flex-col md:flex-row gap-10 lg:backdrop-blur-sm lg:bg-white/30 md:backdrop-blur-sm md:bg-white/30  p-5 md:p-20 rounded-lg max-w-6xl">
                    <img
                        src={mangaDetail.imageUrl}
                        alt={mangaDetail.name}
                        className="w-full md:w-1/3 h-auto  object-cover rounded-lg shadow-lg"
                    />
                    <div className="space-y-5 w-full ">
                        <h1 className="text-xl lg:text-4xl font-bold text-white">{mangaDetail.name}</h1>
                        <p className="text-lg text-white font-medium">Author: {mangaDetail.author}</p>
                        <div className="flex items-center justify-center gap-2 bg-[#433D8B] p-1 max-w-fit  rounded-lg">
                            <FaRegEye className="text-[orange]"/>
                            <p className="text-white/90">{mangaDetail.view}</p>
                        </div>
                        <div className="flex space-x-4 items-center text-gray-300">
                            <p>{mangaDetail.status}</p>
                            <span className="block w-1 h-1 bg-gray-400 rounded-full mx-2"></span>
                            <p>{mangaDetail.updated}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 ">
                            {Array.isArray(mangaDetail.genres) ? (
                                mangaDetail.genres.map((genre, index) => (
                                    <span key={index} className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                                        {genre}
                                    </span>
                                ))
                            ) : (
                                <span>{mangaDetail.genres}</span>
                            )}
                        </div>
                    </div>
                </div>


                 <div className=" overflow-y-auto max-h-96 scrollbar-custom max-w-6xl w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 p-5 ">
                        {Array.isArray(mangaDetail.chapterList) ? (
                                        mangaDetail.chapterList.map((chapter, index) => (
                                            <Link to={`/manga/${id}/${chapter.id}`}>   
                                                <div key={index} className="relative group bg-[#433d8b] p-4 text-center rounded-lg truncate">
                                                    {chapter.name}
                                                    {/* Tooltip hanya muncul saat hover */}
                                                    <div className="absolute hidden group-hover:block bg-black text-white text-xs p-2 rounded-lg w-full  whitespace-normal break-words  left-1/2 transform -translate-x-1/2 -translate-y-full mt-1  z-10">
                                                        {chapter.name}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <span>{mangaDetail.chapterList}</span>
                                    )}
                    </div>
                </div>
            </div>
        );
    };

    export default MangaDetails;
