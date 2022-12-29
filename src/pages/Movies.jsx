import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { getSearchMovies } from '../fetch-api/search-movies';
import { Searchbar } from '../components/Searchbar/Searchbar';
import { Loader } from '../components/Loader/Loader';
import { Container } from '../components/SharedLayout/SharedLayout.styled';
import { MovieList } from '../components/MovieList/MovieList';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [foundMovies, setFoundMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState(null);
  const searchQuery = searchParams.get('query') ?? '';
  const location = useLocation();

  const handleFormSubmit = value => {
    setSearchParams(value !== '' ? { query: value } : {});
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    async function getSearchMoviesData() {
      try {
        setIsLoading(true);
        setError(null);
        const searchMoviesData = [];
        const resp = await getSearchMovies(searchQuery);
        console.log(resp);

        const moviesSearchInfo = resp.results;
        console.log(moviesSearchInfo);

        if (moviesSearchInfo.length === 0) {
          toast.error(
            'Sorry, there are no movies matching your search query. Please try again.'
          );
          setSearchParams(prevSearchParams => (prevSearchParams = {}));
          setFoundMovies(prevFoundMovies => (prevFoundMovies = []));
          return;
        }

        moviesSearchInfo.map(
          ({ id, original_title, poster_path, vote_average, name }) => {
            const movie = {
              id,
              name,
              title: original_title,
              poster: poster_path,
              voteAverage: vote_average,
            };
            return searchMoviesData.push(movie);
          }
        );

        setFoundMovies(searchMoviesData);
      } catch (error) {
        toast.error('We`re sorry, something went wrong!');
      } finally {
        setIsLoading(false);
      }
    }
    getSearchMoviesData();
  }, [searchQuery, setSearchParams]);

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />
      {isLoading && <Loader />}
      {foundMovies.length > 0 && (
        <MovieList movies={foundMovies} state={{ from: location }} />
      )}
      <Toaster position="top-right" />
    </Container>
  );
};

export default Movies;