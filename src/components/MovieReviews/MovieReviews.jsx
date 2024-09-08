import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../api/api";
import css from "./MovieReviews.module.css";
import Loader from "../Loader/Loader";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviewsList, setReviewsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { results } = await getMovieReviews(movieId);
        setReviewsList(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <>
      {reviewsList.length === 0 ? (
        <p>There are no reviews yet</p>
      ) : (
        <>
          {isLoading && <Loader />}
          <ul className={css.movieReviews}>
            {reviewsList.map(({ content, author, id }) => {
              return (
                <li key={id}>
                  <h3>{author}</h3>
                  <p>{content}</p>
                </li>
              );
            })}
          </ul>
          {error && <h2>Something went wrong ...</h2>}
        </>
      )}
    </>
  );
};

export default MovieReviews;
