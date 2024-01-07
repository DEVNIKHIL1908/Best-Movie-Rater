import { useEffect, useRef, useState } from "react";
import "./App.css";
import MainLayout from "./MainLayout/MainLayout";
import Navbar from "./NavbarComponents/Navbar";
// import StarRating from "./Components/StarRating";



const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr)=> arr.reduce((acc,curr,i,arr)=> acc + curr / arr.length , 0)

const Key = "2bdb3868";


function App() {
  const [movieList, setMovieList] = useState([])
  const [watchedMovieList, setWatchedMovieList] = useState(()=>{
    let localMovie =  localStorage.getItem("watchedMovie")
    return localMovie ?  JSON.parse(localMovie)  :[] 
  })
  const [selectedMovieId, setSelectMovieId] = useState("")
  const [selectedMovie, setSelectedMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [query, setQuery] = useState("")

  const [isDark,setIsDark] = useState(false)

   const inputHook = useRef(null)

   const [modalOpen, setModalOpen] = useState(false);
   const [result, setResult] = useState(null);
   function handleModal() {
     setModalOpen(true);
   }
   function handleSpeech() {
     window.SpeechRecognition =
       window.SpeechRecognition || window.webkitSpeechRecognition;
     const recoginition = new SpeechRecognition();
     recoginition.interimResults = true;
 
     recoginition.addEventListener("result", function (e) {
       const transcript = Array.from(e.results)
         .map((result) => result[0])
         .map((reslt) => reslt.transcript)
         .join("");
 
        //  if(transcript.includes("turn on dark mode")){
        //   setIsDark(true)
        //  }
        //  if(transcript.includes("turn off dark mode")){
        //   setIsDark(false)
        //  }
         if(!transcript.includes("turn off dark mode") && !transcript.includes("turn on dark mode")){
            setResult(transcript);
            setQuery(transcript)
          }
       
     });
 
     recoginition.addEventListener("end", recoginition.start());
     // recoginition.start()
   }
 
   useEffect(() => {
     if (modalOpen) {
       handleSpeech();
     }

     
     return  ()=>{
      if(result === null){
        setTimeout(()=>{
          setModalOpen(false)
        },5000)
       }
     }
   }, [modalOpen,result]);
   
  function handleDarkMode(){
    setIsDark(dark => !dark)
  }

  function handleSelectedMovieId(id){
    setSelectMovieId(id)
  }

  function handleAddWatchedMovie(movie){
    setWatchedMovieList(prevMovie => [...prevMovie,movie])
  }

  function handleWatchedDeleteMovie(id){
    setWatchedMovieList(movie => movie.filter(watched=> watched.imdbID !== id))
  }

 useEffect(()=>{

  localStorage.setItem("watchedMovie", JSON.stringify(watchedMovieList))
 },[watchedMovieList])

  useEffect(function(){

    let controller = new AbortController()
    let fetchMovies =  async ()=>{
    try{
          setIsLoading(true)
          setErrorMessage("")
        let data = await fetch(`http://www.omdbapi.com/?apikey=${Key}&s=${query}`, {signal: controller.signal}) 
        if(!data.ok){
          throw new Error("Movie fetching failed!")
        }
        
        let res = await data.json()
        if(res.Response === "False"){
          throw new Error("Movie Not Found 🛑")
        }
        setIsLoading(false)
        setMovieList(res.Search) 
        if(result !== null&& modalOpen){
          setTimeout(()=>{
            setModalOpen(false)
            setResult(null)
          },1000)
        }
      }catch(e){
        if(e.name !== "AbortError"){
          // console.log(errorMessage)
          setErrorMessage(e.message)
          console.log(e.message)
        }
      }
      finally{
        setIsLoading(false)
        // setErrorMessage("")
      }
      if(query.length < 3){
        setErrorMessage("")
        setMovieList([])
      }
    }

    handleSelectedMovieId(null)
    fetchMovies()
    return()=> {
      controller.abort()
      clearTimeout()
    }
  },[query])

 

  return (
    <div className={`top ${isDark ? "dark" : "app"}`} >

      <Navbar query={query} modalOpen={modalOpen} result={result} handleModal={handleModal} inputHook={inputHook}  handleDarkMode={handleDarkMode} isDark={isDark} movieList={movieList} setQuery={setQuery}/>
      <MainLayout inputHook={inputHook}  setSelectedMovie={setSelectedMovie} handleWatchedDeleteMovie={handleWatchedDeleteMovie} handleAddWatchedMovie={handleAddWatchedMovie} selectedMovie={selectedMovie} selectedMovieId={selectedMovieId} handleSelectedMovieId={handleSelectedMovieId} movieList={movieList} isLoading={isLoading} errorMessage={errorMessage} watchedMovieList={watchedMovieList} average={average} />
      
    </div>
  );
}

export default App;
