import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../api/api";
import css from "./MovieCast.module.css";
import Loader from "../Loader/Loader";

const MovieCast = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [castList, setCastList] = useState([]);

  const imagePath = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { cast } = await getMovieCast(movieId);
        setCastList(cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);
  return (
    <div className={css.movieCast}>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      <ul>
        {castList.map((person) => {
          return (
            <li key={person.id}>
              <div className={css.personContainer}>
                {person.profile_path === null ? (
                  <div className={css.noPhoto}>
                    <b>No photo</b>
                  </div>
                ) : (
                  <img
                    src={imagePath + person.profile_path}
                    alt={person.name}
                  />
                )}
                <p>{person.name}</p>
                <p>
                  <b>{person.character}</b>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MovieCast;
