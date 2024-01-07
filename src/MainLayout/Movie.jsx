/* eslint-disable react/prop-types */
function Movie({el, handleSelectedMovieId}) {
    return (
        <li key={el.imdbID} onClick={()=>handleSelectedMovieId(el.imdbID)}>
        <div>
           <img src={el.Poster} alt="" /> 
        </div>
        <div className="movie-info">
            <div>{el.Title}</div>
            <div> 🗓️ {el.Year}</div>
        </div>
    </li>
    )
}

export default Movie
