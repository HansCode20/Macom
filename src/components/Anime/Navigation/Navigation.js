import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../NavLogo/Logo';
import { IoMenu, IoClose } from 'react-icons/io5';
import Search from '../Searching/Search';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab')); // Muat dari localStorage
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const activeTabHandler = (category) => {
    setActiveTab(category);
    localStorage.setItem('activeTab', category); // Simpan ke localStorage
  };

  const handleSearch = (searchQuery) => {
    if (searchQuery) {
      navigate(`/anime/search?query=${searchQuery}`);
    }
  };

  const CategoryTab = [
    { category: "Home", link: "/anime" },
    { category: "Anime List", link: "/anime/anime-list" },
    { category: "Jadwal Rilis", link: "/anime/jadwalrilis" },
    { category: "On-going Anime", link: "/anime/on-going" },
    { category: "Completed Anime", link: "/anime/completed" },
    { category: "Genre List", link: "/anime/genres" }
  ];

  return (
    <div className="fixed lg:relative z-50 top-0 left-0 right-0 flex flex-wrap items-center justify-between mx-auto p-5 gap-3 bg-black/80">
      <Logo />
      
      <div>
        <button
          type="button"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          className="lg:hidden text-gray-500 dark:text-gray-400 p-2.5 me-1 md:order-1"
        >
          {isOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>

      <div className={`items-center justify-between w-full lg:flex lg:w-auto bg-black/40 opacity-75 rounded-lg ${isOpen ? 'block' : 'hidden'}`} id="navbar-search">
        <div className='flex justify-center items-center lg:mr-5 mb-5 lg:mb-0'>
         <Search onSearch={handleSearch} />
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-end gap-5 lg:items-center w-full">
          {CategoryTab.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={`font-semibold text-gray-500 hover:text-white ${activeTab === item.category ? 'text-white' : ''}`}
              onClick={() => activeTabHandler(item.category)}
            >
              {item.category}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
