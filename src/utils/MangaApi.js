import axios from "axios";

// Define base URLs
// const MANGA_API_URL = "https://test-sigma-eight-83.vercel.app/api/mangaList";
// const MANGA_API_BASE_URL = "https://test-sigma-eight-83.vercel.app/api";

// export const getMangaList = async (category = "", page = 1, type = "", state = "") => {
//   try {
//     const response = await axios.get(MANGA_API_URL, {
//       params: { category, page, type, state },
//     });
//     console.log("Data received:", response.data); 
//     return response.data; 
//   } catch (error) {
//     console.error("Failed to Fetch Data", error.response || error.message || error); 
//     throw error;
//   }
// };

// export const searchManga = async (query, page = 1) => {
//   try {
//     const response = await axios.get(`${MANGA_API_BASE_URL}/search/${query}`, {
//       params: { page },
//     });
//     console.log("Data received:", response.data); 
//     return response.data; 
//   } catch (error) {
//     console.error("Failed to Fetch Data", error.response || error.message || error); 
//     throw error;
//   }
// };

// export const getMangaDetail = async (id) => {
//   try {
//     const response = await axios.get(`${MANGA_API_BASE_URL}/manga/${id}`);
//     console.log("Data received:", response.data); 
//     return response.data; 
//   } catch (error) {
//     console.error("Failed to Fetch Data", error.response || error.message || error); 
//     throw error;
//   }
// };

// export const getMangaPath = async (id, ch) => {
//   try {
//     const response = await axios.get(`${MANGA_API_BASE_URL}/manga/${id}/${ch}`);
//     return response.data;
//   } catch (error) {
//     console.error("Failed to Fetch Data", error.response || error.message || error); 
//     throw error;
//   }
// };

const MANGA_API_URL = "https://mangareaderto-api.vercel.app/api/v1/";

export const getMangaLatest= async () => {
  try {
    const response = await axios.get(`${MANGA_API_URL}latest-updates`);
    return response.data;
  } catch (error) {
    console.error("Failed to Fetch Data", error.response || error.message || error); 
    throw error;
  }
}