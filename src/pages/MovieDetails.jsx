import { useEffect, useState } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
//import toast, { Toaster } from 'react-hot-toast';
import { getMovieDetails } from '../fetch-api/movie-details';
import MovieItemDetails from '../components/MovieItemDetails/MovieItemDetails';
import { Container } from '../components/SharedLayout/SharedLayout.styled';
import { Loader } from '../components/Loader/Loader';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getDetailsData() {
      try {
        setIsLoading(true);
        setError(null);
        const { original_title, genres, overview, poster_path, vote_average } =
          await getMovieDetails(movieId);
        const movieData = {
          title: original_title,
          genres: genres,
          overview: overview,
          poster: poster_path,
          rating: vote_average,
        };
        setMovieData(movieData);
      } catch (error) {
        navigate('/home', { replace: true });
        //toast.error('We`re sorry, something went wrong!');
      } finally {
        setIsLoading(false);
      }
    }
    getDetailsData();
  }, [movieId, navigate]);

  return (
    <Container>
      {isLoading && <Loader />}
      {movieData && <MovieItemDetails movieInfo={movieData} />}
      {/* <Toaster position="top-right" /> */}
      <Outlet />
    </Container>
  );
};

export default MovieDetails;
