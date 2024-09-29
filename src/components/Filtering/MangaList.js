import React from "react";
import { Link } from "react-router-dom";

// React Icons
import { FaRegEye } from "react-icons/fa";

const MangaList = ({ mangaList }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-3 gap-6">
      {mangaList.map((manga) => (
          <div key={manga.id} className="relative group ">
            <div className="relative space-y-3 hover:scale-105 duration-300 ">
              <img src={manga.image} alt={manga.title} className="w-full h-80 object-cover rounded-lg"/>
              <div className="absolute bottom-0 p-5 bg-gradient-to-t from-black w-full space-y-2 bg-gray-500/60">
                <p className="text-center text-white/90 text-sm font-medium truncate ">{manga.title}</p>
                  <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/60 bg-gray-500/50 p-1 rounded-lg ">
                        <FaRegEye className="text-[orange]"/>
                        <p className="text-xs font-medium">{manga.view || 0}</p>
                      </div>
                      <Link to={`/manga/${manga.id}`}> 
                        <button className="btn btn-secondary">Read</button>
                      </Link>
                  </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MangaList;
