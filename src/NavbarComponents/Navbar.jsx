import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import Logo from "./Logo";
import ResultNum from "./ResultNum";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Navbar({query, movieList, setQuery, handleDarkMode, isDark, inputHook,handleModal,result,modalOpen }) {
 

  return (
    <nav className="nav">
      <div className="nav-comp-container">
        <Logo />
        <SearchBar
        query={query}
          setQuery={setQuery}
          inputHook={inputHook}
          handleModal={handleModal}
        />
        <ResultNum movieList={movieList} />
      </div>
      <span className="darkIcon" onClick={handleDarkMode}>
        {isDark ? "☀️" : "🌑"}
      </span>

      {modalOpen && (
        <div className="modal">
          <FontAwesomeIcon className="modal-icon" icon={faMicrophone} />
          {!result ? (
            <div className="boxContainers">
              <div className="boxes box1"></div>
              <div className="boxes box2"></div>
              <div className="boxes box3"></div>
              <div className="boxes box4"></div>
              <div className="boxes box5"></div>
            </div>
          ) : (
            <p className="search-input">{result}</p>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
