import { Link } from 'react-router-dom';
import noPicture from '../../images/noPicture.png';
import PropTypes from 'prop-types';

export const MovieItem = ({ id, title, poster, voteAverage, state }) => {
  return (
    <div>
      <Link to={`/movies/${id}`} state={state}>
        <img
          width="380px"
          src={poster ? `https://image.tmdb.org/t/p/w500/${poster}` : noPicture}
          alt={title}
        />
        <h3>{title}</h3>
        <p>{voteAverage}</p>
      </Link>
    </div>
  );
};

MovieItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  poster: PropTypes.string,
  voteAverage: PropTypes.number,
  state: PropTypes.string,
};
