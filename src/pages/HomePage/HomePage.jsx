import { useState, useEffect } from "react";

import { useLocation, Link } from "react-router-dom";
import css from "./HomePage.module.css";
import { getTrendingMovies } from "../../api/api";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [trendMovies, setTrendMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { pathname, search } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { results } = await getTrendingMovies();
        setTrendMovies(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={css.trendsList}>
      <h1>Trending today</h1>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {trendMovies.map((movie) => (
        <Link
          key={movie.id}
          to={`/movies/${movie.id}`}
          state={{ from: `${pathname}${search}` }}
        >
          {movie.title}
        </Link>
      ))}
    </div>
  );
};

export default HomePage;
