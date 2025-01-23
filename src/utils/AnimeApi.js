import axios from "axios";


  export const getAnimeHome = async () => {
      try {
        const response = await axios.get(`https://wajik-anime-api.vercel.app/samehadaku/home`);
        return response.data;
      } catch (error) {
        console.error("Failed to Fetch Data", error.response || error.message || error); 
        throw error;
      }
  };

  export const getBatchAnime = async ( page = 1) => {
    try {
      const response = await axios.get(`https://wajik-anime-api.vercel.app/samehadaku/batch?page=${page}`);
      return response.data;
    } catch (error) {
      console.error("Failed to Fetch Data", error.response || error.message || error); 
      throw error;
    }
  };


  export const getBatchAnimeById = async (id) => {
    try {
      const response = await axios.get(`https://wajik-anime-api.vercel.app/samehadaku/batch/${id}`);
      return response.data;
    } catch (error) {
      console.error("Failed to Fetch Data", error.response || error.message || error); 
      throw error;
    }
  };

  export const getMovieAnime = async ( page = 1) => {
    try {
      const response = await axios.get(`https://wajik-anime-api.vercel.app/samehadaku/movies?page=${page}`);
      return response.data;
    } catch (error) {
      console.error("Failed to Fetch Data", error.response || error.message || error); 
      throw error;
    }
  };


  
  export const getAnimes = async () => {
    try {
      const response = await axios.get(`https://wajik-anime-api.vercel.app/samehadaku/anime`);
      return response.data;
    } catch (error) {
      console.error("Failed to Fetch Data", error.response || error.message || error); 
      throw error;
    }
  };
  
  export const getAnimesById = async ( id ) => {
    try {
      const response = await axios.get(`https://wajik-anime-api.vercel.app/samehadaku/anime/${id}`);
      return response.data;
    } catch (error) {
      console.error("Failed to Fetch Data", error.response || error.message || error); 
      throw error;
    }
  };
  
  
  export const getRilisSchedule = async () => {
    try {
      const response = await axios.get(`https://wajik-anime-api.vercel.app/samehadaku/schedule`);
      return response.data;
    } catch (error) {
      console.error("Failed to Fetch Data", error.response || error.message || error); 
      throw error;
    }
  };
  
  export const getAnimeOngoing = async (page = 1) => {
    try {
      const response = await axios.get(`https://wajik-anime-api.vercel.app/samehadaku/ongoing?page=${page}`);
      return response.data;
    } catch (error) {
      console.error("Failed to Fetch Data", error.response || error.message || error); 
      throw error;
    }
  };

  export const getAnimeCompleted = async ( page = 1) => {
    try {
      const response = await axios.get(`https://wajik-anime-api.vercel.app/samehadaku/completed?page=${page}`);
      return response.data;
    } catch (error) {
      console.error("Failed to Fetch Data", error.response || error.message || error); 
      throw error;
    }
  };

  export const getPopularAnime = async (page = 1) => {
    try {
      const response = await axios.get(`https://wajik-anime-api.vercel.app/samehadaku/popular?page=${page}&limit=20`);
      return response.data;
    } catch (error) {
      console.error("Failed to Fetch Data", error.response || error.message || error); 
      throw error;
    }
  };

  export const getGenreList = async () => {
    try {
      const response = await axios.get(`https://wajik-anime-api.vercel.app/samehadaku/genres`);
      return response.data;
    } catch (error) {
      console.error("Failed to Fetch Data", error.response || error.message || error); 
      throw error;
    }
  };

  export const getGenreListId = async (id, page = 1) => {
    try {
      const response = await axios.get(`https://wajik-anime-api.vercel.app/samehadaku/genres/${id}?page=${page}`);
      return response.data;
    } catch (error) {
      console.error("Failed to Fetch Data", error.response || error.message || error); 
      throw error;
    }
  };

  export const getSearchAnime = async (query) => {
    try {
      const response = await axios.get(`https://wajik-anime-api.vercel.app/samehadaku/search?query=${query}`,{
        params: {
          q: query
        }
      });
      return response.data;
    } catch (error) {
      console.error("Failed to Fetch Data", error.response || error.message || error); 
      throw error;
    }
  };

  export const getEpisodeById = async (EpisodeId) => {
    try {
      const response = await axios.get(`https://wajik-anime-api.vercel.app/samehadaku/episode/${EpisodeId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to Fetch Data", error.response || error.message || error); 
      throw error;
    }
  };

  
  export const getServerId = async ( serverId) => {
    try {
      const response = await axios.get(`https://wajik-anime-api.vercel.app/samehadaku/server/${serverId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to Fetch Data", error.response || error.message || error); 
      throw error;
    }
  };

  
  



