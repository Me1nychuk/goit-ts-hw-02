import axios, { AxiosResponse } from "axios";


interface ImageData {
  id: string;
  urls: {
    small: string;
    full: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
}

interface UnsplashResponse {
  results: ImageData[];
  total_pages: number;
}



  axios.defaults.baseURL = "https://api.unsplash.com";
  axios.defaults.headers.common["Authorization"] = "Client-ID LyoWrIy7suC6iwDtcAjvizXsEns1fb84fMdgvDbu6Ng";

  export const fetchImages = async (query:string, page:number = 1):Promise<UnsplashResponse> => {
    const response = await axios.get(`/search/photos?query=${query}&page=${page}`);
    return response.data;
  };