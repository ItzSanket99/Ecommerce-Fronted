import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = ({ text }) => {
  return (
    <div className="flex justify-center items-center w-full h-[450px]">
      <div className="flex flex-col items-center gap-3">
        <ClipLoader
          color="grey"
          size={96}
          aria-label="loading-spinner"
        />
        <p className="text-slate-800 font-medium">
          {text ? text : "Please Wait..."}
        </p>
      </div>
    </div>
  );
};

export default Loader;
