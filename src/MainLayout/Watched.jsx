/* eslint-disable react/prop-types */
function Watched({ el , handleWatchedDeleteMovie}) {
  console.log(el)
  return (
    <li key={el.imdbID}>
      <div>
        <img src={el.Poster} alt="" />
      </div>
      <div className="movie-info watched-info">
        <div>{el.Title}</div>
        <div className="watched-detail">
          <div> ⭐ {el.imdbRating}</div>
          <div> 🌟 {el.userRating}</div>
          <div> ⏰ {el.Runtime} min</div>
        </div>
      </div>
        <button onClick={()=>handleWatchedDeleteMovie(el.imdbID)} className="dlt-btn">&times;</button>
    </li>
  );
}

export default Watched;
