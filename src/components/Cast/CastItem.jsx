import noPicture from '../../images/noPicture.png';
import PropTypes from 'prop-types';

export const CastItem = ({ character, name, poster }) => {
  return (
    <div>
      <img
        src={poster ? `https://image.tmdb.org/t/p/w500/${poster}` : noPicture}
        alt={name}
        width="250"
      />
      <div>
        <p>{name}</p>
        <p>Character: {character}</p>
      </div>
    </div>
  );
};

CastItem.propTypes = {
  character: PropTypes.string,
  name: PropTypes.string,
  poster: PropTypes.string,
};
