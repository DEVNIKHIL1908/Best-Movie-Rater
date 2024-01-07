/* eslint-disable react/prop-types */
import { useState } from "react";
import Watched from "./Watched";

function WatchedMovie({ watchedMovieList, average, handleWatchedDeleteMovie }) {

  let avgImdbRating = average(watchedMovieList.map((el) => el.imdbRating));
  let avgUserRating = average(watchedMovieList.map((el) => el.userRating));
  let avgDurationTime = average(watchedMovieList.map((el) => el.Runtime));

  return (
    <div>
      <div className="total-info-box">
        
        <div className="total-info">
          <span>#️⃣ {watchedMovieList.length} Movies</span>
          <span> ⭐ {avgImdbRating.toFixed(2)}</span>
          <span> 🌟 {avgUserRating.toFixed(2)}</span>
          <span>⏰ {avgDurationTime.toFixed(2)} min</span>
        </div>
      </div>
      <ul className="box watched-box">
          {watchedMovieList.map((el) => {
            return <Watched el={el} key={el.watchedMovieListmdbID} handleWatchedDeleteMovie={handleWatchedDeleteMovie} />;
          })}
        </ul>
    </div>
  );
}

export default WatchedMovie;
