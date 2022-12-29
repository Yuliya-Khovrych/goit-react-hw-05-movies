import { MovieItem } from 'components/MovieItem/MovieItem';
import { Movies } from './MovieList.styled';
import PropTypes from 'prop-types';

export const MovieList = ({ movies, state }) => {
  return (
    <Movies>
      {movies.map(({ id, title, poster, voteAverage}) => (
        <li key={id}>
          <MovieItem
            id={id}
            title={title}
            poster={poster}
            voteAverage={voteAverage}
            state={state}
          />
        </li>
      ))}
    </Movies>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      state: PropTypes.string,
    })
  ).isRequired,
};