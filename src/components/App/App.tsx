import toast, { Toaster } from 'react-hot-toast'
import SearchBar from '../SearchBar/SearchBar'
import fetchMovies from '../../services/movieService';
import { useState } from 'react';
import type { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleMovies = async(query: string) => {
    setLoading(true);
    setError(false);
    setMovies([]);
    try {
    const data = await fetchMovies(query);
    if (data.length === 0){
      return (toast.error("No movies found for your request."));
    }
    setMovies(data);
    console.log(data);
    return;
    }
    catch {
      setError(true);
      setMovies([]);
    }
    finally{
      setLoading(false);
    }

  };

  return (
    <>
      <Toaster/>
      <SearchBar onSubmit={handleMovies}/>
      {loading && <Loader />}
      {!loading && error && <ErrorMessage />}
      <MovieGrid onSelect={setSelectedMovie} movies={movies} />
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)}/>}
    </>
  )
}

export default App
