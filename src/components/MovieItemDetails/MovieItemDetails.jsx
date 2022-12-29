import { Link, Outlet, useLocation } from 'react-router-dom';
import  Cast  from 'components/Cast/Cast';
import  Reviews  from 'components/Reviews/Reviews';
import { Button, Info, InfoText, GenreList } from './MovieItemDetails.styled';
import noPicture from '../../images/noPicture.png';
import PropTypes from 'prop-types';

export default function MovieItemDetails ({ movieInfo }) {
  const { title, genres, poster, overview, rating } = movieInfo;

  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  return (
    <div>
      <Button to={backLinkHref}>◄ Go back</Button>
      <Info>
        <img
          width="200px"
          src={poster ? `https://image.tmdb.org/t/p/w500/${poster}` : noPicture}
          alt={title}
        />
        <InfoText>
          <h3>{title}</h3>
          <p>Rating: {rating.toFixed(1)}</p>
          <p>
            <b>Overview</b>
          </p>
          <p>{overview}</p>
          <p>
            <b>Genres</b>
          </p>
          {genres.map(genre => (
            <GenreList key={genre.id}>{genre.name}</GenreList>
          ))}
        </InfoText>
      </Info>
      <p>
        <b>Additional information</b>
      </p>
      <ul>
        <li>
          <Link to="cast" element={<Cast />} state={{ from: backLinkHref }}>
            Cast
          </Link>
        </li>
        <li>
          <Link
            to="reviews"
            element={<Reviews />}
            state={{ from: backLinkHref }}
          >
            Reviews
          </Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

MovieItemDetails.propTypes = {
  movieInfo: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      genres: PropTypes.arrayOf(PropTypes.shape),
      poster: PropTypes.string,
      overview: PropTypes.string,
      rating: PropTypes.number,
    })
  ),
  poster: PropTypes.string,
};
