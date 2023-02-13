import React, { useEffect, useState } from 'react';
import axios from './axios';
import requests from './requests.js';
import './Banner.css';

function Banner() {
    const [movie, setMovie] = useState([]);
    useEffect(()=> {
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                    Math.floor(Math.random()*request.data.results.length)
                ]
            );
            return request;
        }
        fetchData();

    },[]);
    return (
        <header  className="banner"
        style={{
            backgroundSize: "Cover",
            backgroundImage:`url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
            )`,
            backgroundPosition: "center center",
        }}>
            
            <div className="banner__contents">
            {/* title */}
            <h1 className="banner__title">
                {movie?.title || movie?.name || movie?.original_name}
            </h1>

            <div className="banner_buttons">
                <button className="banner_button">Play</button>
                <button className="banner_button">My List</button>
            </div>
            <h1 className="banner_description">
                {movie?.overview}
            </h1>
            {/* div > buttons */}
            {/* description */}
            </div>
            <div className="banner--fadeBottom"/>
        </header>
    );
}

export default Banner;