import axios from "axios";
const API_URL = "https://test-sigma-eight-83.vercel.app/api/mangaList";

export const getMangaList = async (category = "", page = 1, type = "", state = "") => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        category,
        page,
        type,
        state
      },
    });
    console.log("Data received:", response.data); // Log the whole data structure
    return response.data; // Return the entire response data (which contains mangaList and metaData)
  } catch (error) {
    console.log("Failed to Fetch Data", error.response || error); // Log the error for debugging
    throw error;
  }
};

export const searchManga = async (query, page = 1) => {
  try {
    const response = await axios.get(`https://test-sigma-eight-83.vercel.app/api/search/${query}`, {
      params: {
        page,
      },
    });
    console.log("Data received:", response.data); // Log the whole data structure
    return response.data; // Assuming the data contains mangaList and metaData
  } catch (error) {
    console.error("Failed to Fetch Data", error.response || error); // Log error for debugging
    throw error; // Throw error so the caller function knows something went wrong
  }
};

export const getMangaDetail = async (id) => {
  try {
    const response = await axios.get(`https://test-sigma-eight-83.vercel.app/api/manga/${id}`);
    console.log("Data received:", response.data); // Log the whole data structure
    return response.data; // Assuming the data contains mangaList and metaData
  } catch (error) {
    console.error("Failed to Fetch Data", error.response || error); // Log error for debugging
    throw error; // Throw error so the caller function knows something went wrong
  }
};

export const getMangaPath =  async (id,ch) => {
  try {
    const response = await axios.get(`https://test-sigma-eight-83.vercel.app/api/manga/${id}/${ch}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
