import axios from 'axios';

const MY_KEY = 'yNPR-89yPZQuBhnaYzUSUIH46QCcVM51IVaOx0cg-RM';

export const fetchHits = async (query, page, signal) => {
  const response = await axios.get(
    `https://api.unsplash.com/search/photos?client_id=${MY_KEY}&query=${query}&page=${page}`,
    { signal }
  );

  return response.data;
};
