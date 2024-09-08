import { useEffect, useRef, useState } from "react";
import {
  useLocation,
  useParams,
  Outlet,
  Link,
  NavLink,
} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { getMovie } from "../../api/api";
import { SlArrowLeft } from "react-icons/sl";
import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const imagePath = "https://image.tmdb.org/t/p/original";
  const goBack = useRef(location?.state?.from ?? "/");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getMovie(movieId);
        setMovieDetails(data);
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
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      <Link className={css.link} to={goBack.current}>
        <SlArrowLeft />
        Go Back
      </Link>
      {movieDetails !== null && (
        <>
          <div
            className={clsx(css.moviedetails, movieDetails.adult && css.adult)}
          >
            <img
              src={imagePath + movieDetails.poster_path}
              alt={movieDetails.title}
            />
            <div className={css.info}>
              <h3 className={css.title}>{`${movieDetails.title} (${parseInt(
                movieDetails.release_date
              )})`}</h3>
              <div className={css.score}>
                User score: {movieDetails.vote_average}
              </div>
              <h4 className={css.title}>Overview</h4>
              <p>{movieDetails.overview}</p>
              <h4 className={css.title}>Genres</h4>
              <p>{movieDetails.genres.map((genre) => genre.name).join(", ")}</p>
            </div>
          </div>
          <div className={css.linkWrap}>
            <NavLink to="cast" className={css.infoLink}>
              Cast
            </NavLink>
            <NavLink to="reviews" className={css.infoLink}>
              Reviews
            </NavLink>
          </div>

          <Outlet />
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;
