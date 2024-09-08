import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYjI2NjIzYjJkNmJhZjcxZWRkN2ZhMjEyYTA2OWJlZSIsIm5iZiI6MTcyNTcxOTUyNy43MDE1MTYsInN1YiI6IjY2ZGM1Y2Q4ZDg0NDk5MzE2YmNkMGM2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cWWDCnavjO3OVCgLcCg2QwmhXRks2k-b__yL4rO0NVs";

export const getTrendingMovies = async () => {
  const { data } = await axios.get("/trending/movie/day");

  return data;
};

export const getMovies = async (query) => {
  const { data } = await axios.get(`/search/movie?query=${query}`);

  return data;
};

export const getMovie = async (id) => {
  const { data } = await axios.get(`/movie/${id}`);

  return data;
};

export const getMovieCast = async (id) => {
  const { data } = await axios.get(`/movie/${id}/credits`);

  return data;
};

export const getMovieReviews = async (id) => {
  const { data } = await axios.get(`/movie/${id}/reviews`);

  return data;
};
