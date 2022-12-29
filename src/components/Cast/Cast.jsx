import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { getCast } from 'fetch-api/cast';
import { Container } from 'components/SharedLayout/SharedLayout.styled';
import { Loader } from 'components/Loader/Loader';
import { CastList } from 'components/Cast/CastList';

export  default function Cast () {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getCastData() {
        try {
            setIsLoading(true);
            setError(null);
        const castData = [];
            const resp = await getCast(movieId);
            console.log(resp.cast);
        resp.cast.map(({ id, character, name, profile_path }) => {
          const movieCastData = { id, character, name, poster: profile_path };
          return castData.push(movieCastData);
        });
        setCast(castData);            
      } catch (error) {
        toast.error('We`re sorry, something went wrong!');
      } finally {
        setIsLoading(false);
      }
    }
    getCastData();
  }, [movieId]);

  return (
    <Container>
      {isLoading && <Loader />}
      {cast.length > 0 ? (
        <CastList cast={cast} />
      ) : (
        <p>There is no cast information for this movie</p>
      )}
      <Toaster position="top-right" />
    </Container>
  );
}