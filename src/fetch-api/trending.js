import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '09a141b997a10edba2747d029eb90ca7';

export async function getTrending() {
  const response = await axios.get(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
  );

  console.log(response.data);
  return response.data;
}
