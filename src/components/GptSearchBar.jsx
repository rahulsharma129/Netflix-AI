import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, GEMINI_KEY } from "../utils/constants";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  // Search Movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };
  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);
     const genAI = new GoogleGenerativeAI(GEMINI_KEY);
     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

     const prompt = "Act as a Movie Recommendation Sytem and suggest some movies for the query :" +
      searchText.current.value +
      " only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil gaya  ";
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      if (!text) {
        console.error("No response text received");
      }

      console.log(text);
      //Padosan, Gol Maal, Chupke Chupke, Angoor, Jaane Bhi Do Yaaro
      const gptMovies = text.split(",");

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      // This will return an array of promises

      const tmdbResults = await Promise.all(promiseArray);
      // This will wait for all promises to resolve
      console.log(tmdbResults);

      dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}));
  };
  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          ref={searchText}
          className=" p-4 m-4 bg-white col-span-9 rounded-lg"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
