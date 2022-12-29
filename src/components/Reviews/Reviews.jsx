import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { getReviews } from 'fetch-api/reviews';
import { Container } from 'components/SharedLayout/SharedLayout.styled';
import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';

const ReviewItem = ({ author, content }) => {
  return (
    <div>
      <p>
        <b>Author: {author}</b>
      </p>
      <p>{content}</p>
    </div>
  );
};

export default function Reviews () {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getReviewsData() {
      try {
        setIsLoading(true);
        setError(null);
        const reviewsData = [];
        const resp = await getReviews(movieId);
        console.log(resp.results);
        resp.results.map(({ id, author, content }) => {
          const movieReviewsData = {
            id,
            author,
            content,
          };
          return reviewsData.push(movieReviewsData);
        });
        setReviews(reviewsData);
      } catch (error) {
        toast.error('We`re sorry, something went wrong!');
      } finally {
        setIsLoading(false);
      }
    }
    getReviewsData();
  }, [movieId]);

  return (
    <Container>
      {isLoading && <Loader />}
      {!reviews.length ? (
        <p>We don't have any reviews for this movie</p>
      ) : (
        <ul id="reviews">
          {reviews.map(({ author, content, id }) => {
            return (
              <li key={id}>
                <ReviewItem author={author} content={content} />
              </li>
            );
          })}
        </ul>
      )}
      <Toaster position="top-right" />
    </Container>
  );
};

ReviewItem.propTypes = {
  author: PropTypes.string,
  content: PropTypes.string,
  id: PropTypes.number.isRequired,
};

