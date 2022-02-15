import React, { useState, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../api/api";
import { getSearchedMoviesFromStore } from "../redux/actions";
const backArrow = require('../posters/Back.png');
const searchIcon = require('../posters/search.png');
const navBar = require('../posters/nav_bar.png')

const MoviesList = () => {
    const [movies, setMovies] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch()
    const movieList = useSelector(state => state.movies)
    useEffect(() => {
        loadMovies();
        console.log("Movies List", movieList)
    }, [])
 
    useEffect(() => {
        if (movieList?.length > 0) {
            setMovies(movieList);
        }
        else {
            setMovies([]);
        }
    }, [movieList])

    const searchHandler = () => {
        //setSearchTerm(e.target.value);
        dispatch(getSearchedMoviesFromStore(searchTerm));
    }

    const setSearch = (e) => {
        setSearchTerm(e.target.value);
        dispatch(getSearchedMoviesFromStore(e.target.value));
    }

    //let imageComponent;
    // function setImage (movie) {
    //      imageComponent = React.lazy(() => import(`../posters/${movie["poster-image"]}`)); //For 
    // }  //for dynamic import handler in case of missing poster

    function loadMovies() {
        getMovies(pageNo)
            .then(response => {
                if (pageNo > 1) {
                    let arr = [...movies, ...response];
                    setMovies(arr);
                }
                else {
                    setMovies(response);
                }
            })
            .catch(error => {
                console.log('End of Page', error);
            })

    }

    const scrollEvent = (e) => {
        var bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 200; //bool to check if user has reached the bottom of the page
        if (bottom) {
            let pg = pageNo + 1;
            setPageNo(pg);
            loadMovies();
        }
    }

    return (
        <div className="main-container" >
            <div>
                <div className="header">
                    <div className="header-grp">
                        <div className="icon-container">
                            <img src={backArrow} alt="back-arrow" />
                        </div>
                        <div style={{ "marginTop": "3px" }}>
                            <h3>Romantic Comedy</h3>
                        </div>
                    </div>
                    <div style={{ "display": "flex" }}>
                        <div style={{ "margin": "22px 1px" }}>
                            <input placeholder="Search" value={searchTerm} onChange={setSearch} style={{ "width": "70px" }} type="text"></input>
                        </div>
                        <div className="icon-container">
                            <img onClick={searchHandler} src={searchIcon} alt="search" />
                        </div>
                    </div>

                </div>
                <image src={navBar} />
            </div>

            <div onScroll={scrollEvent} className="movie-container">
                {movies.length === 0 && <div className="no-results">No Match Results</div>}
                {movies?.map((movie, index) => {
                    // setImage(movie)
                    return (
                        <div key={index} className="movie-card">
                            <div className="poster-container">
                                {/* <Suspense>
                                <img src={imageComponent} alt="No Image" />
                                </Suspense> */}
                                <img src={require(`../posters/${movie["poster-image"]}`)} alt="Poster Down" />
                            </div>
                            <p className="movie-name">{movie.name}</p>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default MoviesList;