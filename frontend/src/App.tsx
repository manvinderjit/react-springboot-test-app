import './App.css'
import { useEffect, useState, type JSX } from "react";
interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
}

function App(): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovie, setNewMovie] = useState<Omit<Movie, "id">>({
    title: "",
    director: "",
    year: new Date().getFullYear(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMovie((prev) => ({
      ...prev,
      [name]: name === "year" ? parseInt(value) : value,
    }));
  };

  useEffect(() => {
    fetch(`/api/movies`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch movies");
        return res.json();
      })
      .then((data: Movie[]) => setMovies(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(`/api/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    })
      .then((res) => res.json())
      .then((createdMovie: Movie) => {
        setMovies((prev) => [...prev, createdMovie]); // append to list
        setNewMovie({
          title: "",
          director: "",
          year: new Date().getFullYear(),
        }); 
      })
      .catch((err) => console.error("Error adding movie:", err));
  };


  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-200">
        Manvinder's Movie Library
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mb-10 max-w-md mx-auto  p-6 rounded shadow"
      >
        <h2 className="text-2xl text-center font-semibold mb-4">Add a New Movie</h2>

        <input
          type="text"
          name="title"
          value={newMovie.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full mb-3 px-4 py-2 border rounded"
          required
        />

        <input
          type="text"
          name="director"
          value={newMovie.director}
          onChange={handleChange}
          placeholder="Director"
          className="w-full mb-3 px-4 py-2 border rounded"
          required
        />

        <input
          type="number"
          name="year"
          value={newMovie.year}
          onChange={handleChange}
          placeholder="Year"
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Add Movie
        </button>
      </form>

      <h2 className="text-2xl text-center font-semibold mb-4">Movies in Library</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {movie.title}
            </h2>
            <p className="text-gray-700">
              Directed by <span className="font-medium">{movie.director}</span>
            </p>
            <p className="text-sm text-gray-500">Released: {movie.year}</p>
          </div>
        ))}
      </div>
    </main>
  );

}

export default App
