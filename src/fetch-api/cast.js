import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '09a141b997a10edba2747d029eb90ca7';

export async function getCast(id) {
  const response = await axios.get(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  );

  console.log(response.data);
  return response.data;
}
