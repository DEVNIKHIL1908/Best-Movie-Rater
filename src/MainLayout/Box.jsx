import { useState } from "react"

function Box({children}) {
    const [isOpenMovie, setIsOpenMovie] = useState(true)

    function handleList(){
      setIsOpenMovie(isOpen => !isOpen)
    }
    return (
        <div className="movie-box">
      <span className="toggleHideShow" onClick={handleList}>{isOpenMovie ? "-": "+"}</span>
      {isOpenMovie && children}
    </div>
    )
}

export default Box
