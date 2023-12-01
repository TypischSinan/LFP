import React from "react";
import { useRouter } from "next/router";

const Home = ({ isDarkMode }) => {
  const router = useRouter();

  const navigateTo = (route) => {
    router.push(route);
  };

  return (
    <div
      className={`container mx-auto p-8 mb-20 ${
        isDarkMode ? "text-white" : "text-black"
      }`}
    >
      <h2
        className={`text-2xl font-bold mb-6 text-center ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Bitte wähle deine Übung aus:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 place-content-center">
        <button
          onClick={() => navigateTo("/javaExercise1")}
          className={`text-slate-500 font-bold w-full h-full p-4 bg-slate-300 hover:bg-blue-400 rounded-lg `}
        >
          Exercise 1
        </button>
        <button
          onClick={() => navigateTo("/javaExercise2")}
          className={`text-slate-500 font-bold w-full h-full p-4 bg-slate-300 hover:bg-blue-400 rounded-lg `}
        >
          Exercise 2
        </button>
        <button
          onClick={() => navigateTo("/javaExercise3")}
          className={`text-slate-500 font-bold w-full h-full p-4 bg-slate-300 hover:bg-blue-400 rounded-lg `}
        >
          Exercise 3
        </button>
        <button
          onClick={() => navigateTo("/javaExercise4")}
          className={`text-slate-500 font-bold w-full h-full p-4 bg-slate-300 hover:bg-blue-400 rounded-lg `}
        >
          Exercise 4
        </button>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => {
            navigateTo("/overview");
          }}
          className="mt-4 mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-center"
        >
          Zurück
        </button>
      </div>
    </div>
  );
};

export default Home;
