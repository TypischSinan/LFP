import React from "react";
import { useRouter } from "next/router";

const Overview = ({ isDarkMode }) => {
  const router = useRouter();

  const navigateTo = (route) => {
    router.push(route);
  };

  return (
    <div className="container mx-auto p-8">
      <h2
        className={`text-2xl font-bold mb-6 text-center ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Bitte wähle eine Programmiersprache aus:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 place-content-center">
        <button
          onClick={() => navigateTo("/python")}
          className="text-slate-500 font-bold w-full h-full p-4 bg-slate-300 hover:bg-blue-400 rounded-lg"
        >
          Python
        </button>
        <button
          onClick={() => navigateTo("/java")}
          className="text-slate-500 font-bold w-full h-full p-4 bg-slate-300 hover:bg-blue-400 rounded-lg"
        >
          Java
        </button>
        <button
          onClick={() => navigateTo("/C++")}
          className="text-slate-500 font-bold w-full h-full p-4 bg-slate-300 hover:bg-blue-400 rounded-lg"
        >
          C++
        </button>
        <button
          onClick={() => navigateTo("/Haskell")}
          className="text-slate-500 font-bold w-full h-full p-4 bg-slate-300 hover:bg-blue-400 rounded-lg"
        >
          Haskell
        </button>
      </div>
    </div>
  );
};

export default Overview;
