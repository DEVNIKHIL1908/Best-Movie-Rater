
import Movie from "./Movie";

/* eslint-disable react/prop-types */
function MovieBox({ movieList, handleSelectedMovieId }) {
 

  return (
    <ul className="box">{movieList.map((el) => {
      return <Movie el={el}key={el.imdbID} handleSelectedMovieId={handleSelectedMovieId}/>
     })}</ul>
  );
}

export default MovieBox;
