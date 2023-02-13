import React,{useState, useEffect} from 'react';
import YouTube from "react-youtube";
import axios from  "./axios.js";
import './Row.css';
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}) {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");


   // A snippet of code which runs based on a specific considtion/variable
    useEffect(()=>{
        // if we leave the array blank then run it once during loads then don't donnot run
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchUrl]);

    const opts = {
        height:"390",
        width:"100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl){
            setTrailerUrl('');

        }else{
            movieTrailer(movie?.name || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));

            }).catch((error) => console.log(error));
        }
    }

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className="row__poster">
                {movies.map(movie=> (
                    <img
                    key={movie.id}
                    onClick = {() => handleClick(movie)}
                    className={isLargeRow?"row__posterLarge":"row__posters"}
                    src={`${base_url}${
                        isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name}/>
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}

        
        </div>
    );
}

export default Row;