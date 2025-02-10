import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../NavLogo/Logo';
import { IoMenu, IoClose } from 'react-icons/io5';
import Search from '../Searching/Search';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab')); // Muat dari localStorage
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);


  useEffect(() => {
    const savedActiveTab = localStorage.getItem('activeTab');
    if (savedActiveTab) {
      setActiveTab(savedActiveTab);
    } else {
      setActiveTab('Home');
      navigate('/');
    }
  }, [navigate])

  const activeTabHandler = (category) => {
    setActiveTab(category);
    localStorage.setItem('activeTab', category); // Simpan ke localStorage
    if (category === 'Home') {
      navigate('/');
    }
  };

  const handleSearch = (searchQuery) => {
    if (searchQuery) {
      navigate(`/search?query=${searchQuery}`);
      setIsOpen(false);
    }
  };

  const CategoryTab = [
    { category: "Home", link: "/" },
    { category: "Anime List", link: "/anime-list" },
    { category: "On-going Anime", link: "/on-going" },
    { category: "Completed Anime", link: "/completed" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
        <div 
         className={`fixed z-50 top-0 left-0 right-0 flex flex-wrap justify-between md:justify-center lg:justify-evenly items-center mx-auto p-5 gap-3
         ${isScrolled  || isOpen ? 'bg-black' : 'md:bg-opacity-0 lg:bg-opacity-0'} 
         `}
        >

          <div>
            <Logo />
          </div>
          
            <button
              type="button"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              className="lg:hidden text-white p-2.5 me-1 md:order-1"
            >
              {isOpen ? <IoClose /> : <IoMenu />}
            </button>

          <div className={` md:flex w-full lg:w-auto  ${isOpen ? 'block' : 'hidden'}`} id="navbar-search">
            <div className="flex flex-col lg:flex-row lg:justify-end gap-5 lg:items-center w-full">
              <div className='block md:hidden lg:hidden w-full'>
               <Search onSearch={handleSearch} />
              </div>
                {CategoryTab.map((item, index) => (
                  <Link
                  key={index}
                  to={item.link}
                  className={`font-semibold  ${activeTab === item.category ? 'text-white' : 'text-gray-400'}`}
                  onClick={() => activeTabHandler(item.category)}
                  >
                  {item.category}
                  </Link>
                ))}
            </div>
          </div>

          <div className='hidden lg:block'>
              <Search onSearch={handleSearch} />
          </div>
          
        </div>
  );
};

export default Navigation;
