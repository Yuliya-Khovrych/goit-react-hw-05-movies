import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { getTrending } from '../fetch-api/trending';
import { Loader } from '../components/Loader/Loader';
import { Container } from '../components/SharedLayout/SharedLayout.styled';
import { MovieList } from '../components/MovieList/MovieList';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState(null);
  const [, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function getMoviesData() {
      try {
        setIsLoading(true);
        setError(null);
        const movieData = [];
        const resp = await getTrending();
        console.log(resp);

        const moviesInfo = resp.results;
        console.log(moviesInfo);

        moviesInfo.map(
          ({ id, original_title, poster_path, vote_average }) => {
            const movie = {
              id,
              title: original_title,
              poster: poster_path,
              voteAverage: vote_average,
            };
            return movieData.push(movie);
          }
        );
        setMovies(movieData);
      } catch {
        toast.error('We`re sorry, something went wrong!');
      } finally {
        setIsLoading(false);
      }
    }
    getMoviesData();
  }, []);

  return (
    <Container>
      {isLoading && <Loader />}
      {movies && <MovieList movies={movies} location={location} />}
      <Toaster position="top-right" />
    </Container>
  );
};

export default Home;