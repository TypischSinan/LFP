import React, { useState } from "react";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigateTo = (route) => {
    router.push(route);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-gray-800" : "bg-neutral-100"
        } pb-16`}
      >
        <nav
          className={`bg-black p-4 ${isDarkMode ? "text-white" : "text-black"}`}
        >
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl text-slate-50">LernApp</h1>
            <button
              onClick={toggleDarkMode}
              className="text-slate-50 font-bold"
            >
              {isDarkMode ? (
                <FontAwesomeIcon icon={faSun} />
              ) : (
                <FontAwesomeIcon icon={faMoon} />
              )}
            </button>
          </div>
        </nav>
        <Component {...pageProps} isDarkMode={isDarkMode} />
        <div className="fixed bottom-0 left-0 right-0 bg-gray-300 p-4 flex justify-between rounded-lg">
          <button
            onClick={() => navigateTo("/")}
            className="text-slate-500 font-bold"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigateTo("/overview")}
            className="text-slate-500 font-bold"
          >
            Übung
          </button>
          <button
            onClick={() => navigateTo("/exam")}
            className="text-slate-500 font-bold"
          >
            Prüfung
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
