import axios from 'axios';

//const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '09a141b997a10edba2747d029eb90ca7';

export async function getSearchMovies(query) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie/?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
  );

  console.log(response.data);
  return response.data;
}
