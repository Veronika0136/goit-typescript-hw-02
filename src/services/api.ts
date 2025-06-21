import axios from 'axios';
import { Image } from '../components/App.types';

const MY_KEY: string = 'yNPR-89yPZQuBhnaYzUSUIH46QCcVM51IVaOx0cg-RM';

interface ImagesData {
  results: Image[];
  total: number;
  total_pages: number;
}

export const fetchHits = async (
  query: string,
  page: number,
  signal: AbortSignal
): Promise<ImagesData> => {
  const response = await axios.get<ImagesData>(
    `https://api.unsplash.com/search/photos?client_id=${MY_KEY}&query=${query}&page=${page}`,
    { signal }
  );

  return response.data;
};
