import { useState, useEffect } from "react";

import { getTrendingMovies } from "../../api/api";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [trendMovies, setTrendMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
    <div>
      <h1>Trending today</h1>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      <MovieList movies={trendMovies} />
    </div>
  );
};

export default HomePage;
