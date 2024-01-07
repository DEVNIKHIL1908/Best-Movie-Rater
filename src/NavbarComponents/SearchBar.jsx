import { useState } from "react"
import { faFont, faMicrophone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function SearchBar({query, setQuery,inputHook,handleModal }) {

    return (
        <> 
        <input value={query} ref={inputHook} onChange={(e)=>setQuery(e.target.value)} className="searchbar" placeholder="Search Your Favourite Movie">           
        </input>
        <p onClick={handleModal} className="searchIcon"><FontAwesomeIcon icon={faMicrophone} /></p>

        


        </>
    )
}

export default SearchBar
