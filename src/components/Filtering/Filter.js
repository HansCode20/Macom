// Filter.js
import React, { useState, useEffect } from "react";
import { getMangaList, searchManga} from "../../utils/Api";
import PaginationControls from "../../utils/PaginationControls";
import MangaList from "./MangaList";
import CategoryTab from "./CategoryTab";
import Logo from "../NavLogo/Logo";
import Search from "./Search";
import '../../style/Loader.css';
import MangaType from "./MangaType";
import MangaState from "./MangaState";

const Filter = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("newest");
  const [selectedState, setSelectedState] = useState("all");
  const [mangaList, setMangaList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const fetchMangaData = async () => {
    setLoading(true);
    try {
      const data = await getMangaList(
        selectedCategory !== "all" ? selectedCategory : "",
        currentPage,
        selectedType,
        selectedState
      );
      setMangaList(data.mangaList || []);
      setTotalPages(data.metaData?.totalPages || 1);
    } catch (error) {
      console.log("Error fetching manga:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getMangaList();
      setCategories(data.metaData?.category || []);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const data = await searchManga(query, currentPage);
      setMangaList(data.mangaList || []);
      setTotalPages(data.metaData?.totalPages || 1);
    } catch (error) {
      console.log("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSearching && query) {
      fetchSearchResults();
    } else {
      fetchMangaData();
    }
  }, [selectedCategory, selectedType, currentPage, selectedState, isSearching, query]);

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    setCurrentPage(1);
  };

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setIsSearching(true);
    setCurrentPage(1);
  };

  const handleTypeChange = (newType) => {
    setSelectedType(newType);
    setCurrentPage(1);
    setIsSearching(false);
  };

  const handleStateChange = (newState) => {
    setSelectedState(newState);
    setCurrentPage(1);
    setIsSearching(false);
  };



  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-black min-h-screen">
      {/* Navbar Elements */}
      <div className="sticky top-0 z-10 bg-black">
        <div className="flex justify-between p-2 gap-6 items-center">
          <Logo />
          <div className="flex flex-row-reverse lg:flex-row items-center gap-4">
            <Search onSearch={handleSearch} />
            <div className="flex items-center gap-2">
              <MangaType selectedType={selectedType} onTypeChange={handleTypeChange} />
              <MangaState selectedState={selectedState} onStateChange={handleStateChange} />
            </div>
          </div>
        </div>
      </div>

  
          <div className="mt-5">
            <CategoryTab
              category={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          <div className="p-4 mt-8">
            <MangaList mangaList={mangaList}  />
            <div className="mt-10">
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={setCurrentPage}
              />
            </div>
          </div>
    </div>
  );
};

export default Filter;
