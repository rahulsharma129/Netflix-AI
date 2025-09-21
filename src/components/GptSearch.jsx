import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptSearchPage from "./GptSearchPage";
import { BG_URL } from "../utils/constants";

const GptSearch = () => {
  return (
    <>
      <div className="fixed -z-10">
        <img className="h-screen object-cover md:h-auto" src={BG_URL} alt="logo" />
      </div>
      <div className="">
        <GptSearchBar />
        <GptSearchPage />
      </div>
    </>
  );
};

export default GptSearch;
