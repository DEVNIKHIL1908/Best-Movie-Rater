/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Box from "./Box";
import MovieBox from "./MovieBox";
import WatchedMovie from "./WatchedMovie";
import StarRating from "../Components/StarRating";

const Key = "2bdb3868";


export default function MainLayout({
  selectedMovie,
  movieList,
  watchedMovieList,
  average,
  isLoading,
  errorMessage,
  handleSelectedMovieId,
  selectedMovieId,
  handleAddWatchedMovie,
  handleWatchedDeleteMovie,
  setSelectedMovie,
  inputHook
}) {
  return (
    <div className="mainLayout">
      <Box>
        {!isLoading && errorMessage && <p>{errorMessage}</p>}
        {isLoading && <p className="loading">Loading...</p>}
        {!isLoading && !errorMessage && (
          <MovieBox
            movieList={movieList}
            handleSelectedMovieId={handleSelectedMovieId}
          />
        )}
      </Box>
      <Box>
        {selectedMovieId ? (
          <SelectedMoviePreview
            isLoading={isLoading}
            watchedMovieList={watchedMovieList}
            selectedMovieId={selectedMovieId}
            handleAddWatchedMovie={handleAddWatchedMovie}
            handleSelectedMovieId={handleSelectedMovieId}
            selectedMovie={selectedMovie}
            setSelectedMovie={setSelectedMovie}
            inputHook={inputHook}
          />
        ) : (
          <WatchedMovie
            handleWatchedDeleteMovie={handleWatchedDeleteMovie}
            watchedMovieList={watchedMovieList}
            average={average}
          />
        )}
      </Box>
    </div>
  );
}

function SelectedMoviePreview({
  watchedMovieList,
  selectedMovieId,
  selectedMovie,
  handleSelectedMovieId,
  handleAddWatchedMovie,
  setSelectedMovie,
  inputHook

}) {
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false)

  const {
    Actors,
    Director,
    Plot,
    Poster,
    imdbID,
    Runtime,
    imdbRating,
    Title,
    Genre,
    Released,
  } = selectedMovie;

  function handleAddWatchedMovieToList() {
    const newWatchedMovie = {
      imdbID,
      Title,
      Poster,
      imdbRating,
      userRating,
      Runtime: Runtime.split(" ")[0],
    };

    handleAddWatchedMovie(newWatchedMovie);
    handleSelectedMovieId("");
  }

  useEffect(()=>{
    document.addEventListener("keydown", function(e){
      if(e.code === "Escape"){
        inputHook?.current.focus()
        handleSelectedMovieId(null)
      }
    })
    return ()=> document.removeEventListener("keydown", function(e){
      if(e.code === "Escape"){
        handleSelectedMovieId(null)
      }
    }) 
  })

  const isAlreadyAdded = watchedMovieList
    .map((movie) => movie.imdbID)
    .includes(selectedMovieId);
  const userRatedRating = watchedMovieList.find(
    (movie) => movie.imdbID === selectedMovieId
  )?.userRating;


  useEffect(function(){
    if(!Title) return
      document.title =  `Movie: ${Title}`
      return () => document.title = "Best Watch"
  },[Title])

  useEffect(function(){
    async function fetchingSelectedMovies(){
      try{
        setIsLoading(true)
        let data = await fetch(`https://www.omdbapi.com/?apikey=${Key}&i=${selectedMovieId}`) 
        let res = await data.json()
        console.log(res)
        setSelectedMovie(res)
        setIsLoading(false)
      }catch(e){
        console.log("Sorry No preview available")
      }
    }
    fetchingSelectedMovies()

  },[selectedMovieId])

  return (
    <>
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="movie-preview">
          <button
            className="back-btn"
            onClick={() => {
              inputHook?.current.focus()
              handleSelectedMovieId("")
            }}
          >
            <span>&larr;</span>{" "}
          </button>
          <div className="preview-block">
            <img src={Poster} alt={Title} />
            <div className="detail-block">
              <h2>{Title}</h2>
              <span>{Released}</span>
              <span>{Runtime}</span>
              <p>{Genre}</p>
              <p>Directed By: {Director}</p>
            </div>
          </div>

          <div className="description">
            {isAlreadyAdded ? (
              <p>You have watched this movie already {userRatedRating}</p>
            ) : (
              <>
                <div className="rating">
                  {
                    <StarRating
                      maxCount={10}
                      starColor="#ebbc1f"
                      borderColor="#ebbc1f"
                      onSetRating={setUserRating}
                    ></StarRating>
                  }
                </div>
                {userRating && (
                  <button
                    className="rating-btn"
                    onClick={handleAddWatchedMovieToList}
                  >
                    Add to list{" "}
                  </button>
                )}
                <p className="actors">Cast: {Actors}</p>
              </>
            )}

            <div>{Plot}</div>
          </div>
        </div>
      )}
    </>
  );
}
