import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import { getMovies } from "../../api/api";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query"));

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.query.value;

    if (value) {
      setQuery(value);
    } else {
      toast.error("Can not be blank!");
    }
  };

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { results } = await getMovies(query);
        setMoviesList(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div>
      <div>
        <Toaster />
      </div>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          onChange={(e) =>
            setSearchParams(() =>
              e.target.value.trim() ? { query: e.target.value } : {}
            )
          }
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={moviesList} />
    </div>
  );
};

export default MoviesPage;
