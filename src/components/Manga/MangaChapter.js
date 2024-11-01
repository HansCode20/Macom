import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { getMangaPath } from "../../utils/MangaApi";
import { useNavigate } from "react-router-dom";
import "../../style/Loader.css";

const MangaChapter = () => {
  const { id, ch } = useParams();
  const Navigate = useNavigate();
  const [mangaImage, setMangaImage] = useState([]);
  const [mangaTitle, setMangaTitle] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const fetchMangaChapters = async () => {
      setLoading(true);
      try {
        const response = await getMangaPath(id, ch);
        setMangaImage(response.images);
        setMangaTitle(response.title);
        setChapters(response.chapterListIds);
        setChapterTitle(response.currentChapter);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchMangaChapters();
  }, [id, ch]);

  const currentChapterIndex = chapters.findIndex(
    (chapter) => chapter.id === ch
  );

  const handlePrevChapter = () => {
    if (
      currentChapterIndex !== -1 &&
      currentChapterIndex < chapters.length - 1
    ) {
      const prevChapter = chapters[currentChapterIndex + 1].id; // Ambil ID chapter berikutnya
      Navigate(`/manga/${id}/${prevChapter}`);
    }
  };

  const handleNextChapter = () => {
    if (currentChapterIndex > 0) {
      const nextChapter = chapters[currentChapterIndex - 1].id; // Ambil ID chapter sebelumnya
      Navigate(`/manga/${id}/${nextChapter}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading) {
    return (
      <div className="loadingtext flex justify-center items-center h-screen">
        <p>Loading</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center space-y-20 scrollbar-custom">
      <div
        className={`fixed flex justify-center items-center top-0 p-4 z-20 w-full lg:w-1/3 bg-white/20 shadow-md rounded-lg ${
          scroll ? "text-black opacity-25" : "text-white"
        }`}
      >
        <nav className="text-xs lg:text-md md:text-sm">
          <Link to="/" className="hover:underline">
            Macom
          </Link>
          <span> &gt; </span>
          <Link to={`/manga/${id}`} className="hover:underline">
            {mangaTitle}
          </Link>
          <span> &gt; </span>
          <Link to={`/manga/${id}/${ch}`} className="hover:underline">
            {chapterTitle}
          </Link>
        </nav>
      </div>

      <div className="flex flex-col gap-0 lg:gap-3 bg-black">
        {mangaImage &&
          mangaImage.map((chapter, index) => (
            <div key={index}>
              <img
                src={chapter.image}
                alt={chapter.title}
                referrerPolicy="no-referrer"
                className="w-30 h-30 object-contain mx-auto"
              />
            </div>
          ))}
      </div>

      <div className="flex justify-center items-center gap-4 ">
        <button
          onClick={handlePrevChapter}
          className={`btn bg-[#2E236C] ${
            currentChapterIndex === 0 ? "btn-disabled" : ""
          }`}
        >
          Prev
        </button>

        <button
          onClick={handleNextChapter}
          className={`btn bg-[#2E236C] ${
            currentChapterIndex === chapters.length - 1 ? "btn-disabled" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MangaChapter;
