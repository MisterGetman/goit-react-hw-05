import { Link, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const { pathname, search } = useLocation();

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: `${pathname}${search}` }}
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
