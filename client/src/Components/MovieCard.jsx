function MovieCard({ movie }) {
    async function onFavoriteClick() {
      const loadData = {
        movie_title: movie.title,
        release_year: movie.release_date?.split("-")[0] || "Unknown",
        poster_path: movie.poster_path
      };
  
      try {
        const response = await fetch("http://localhost:4000/add_favorite_movies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loadData)
        });
  
        if (response.ok) {
          alert("Movie added to favorites!");
        } else {
          alert("Failed to add movie.");
        }
      } catch (error) {
        console.error("Error sending favorite movie:", error);
      }
    }
  
    return (
      <div className="movie-card">
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="movie-overlay">
            <button className="favorite-btn" onClick={onFavoriteClick}>♥</button>
          </div>
          <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split("-")[0]}</p>
          </div>
        </div>
      </div>
    );
  }
export default MovieCard  