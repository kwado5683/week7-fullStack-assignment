import { useState, useEffect } from "react";
import "../css/Favorites.css";


function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("https://week7-fullstack-assignment.onrender.com/favorite_movies");
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    fetchFavorites(); 
  }, []);

  return (
    <div className="favorite-page">
      <h2>Your Favorite Movies</h2>
      {favorites.length === 0 ? (
        <p>No favorite movies yet. Start adding some!</p>
      ) : (
        <div className="favorite-grid">
          {favorites.map((movie) => (
            <div key={movie.id} className="favorite-card">
                <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title} 
                    className="favorite-poster"
                />
           
              <h3>{movie.movie_title}</h3>
              <p>Year: {movie.release_year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
