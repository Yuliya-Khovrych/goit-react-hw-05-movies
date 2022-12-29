import PropTypes from 'prop-types';
import { CastItem } from 'components/Cast/CastItem';

export const CastList = ({ cast }) => {
  return (
    <ul style={{ listStyle: 'none' }}>
      {cast.map(({ id, character, name, poster }) => (
        <li key={id}>
          <CastItem character={character} name={name} poster={poster} />
        </li>
      ))}
    </ul>
  );
};

CastList.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};