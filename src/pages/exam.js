import React, { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = ({ isDarkMode }) => {
  const [pythonQuiz, setPythonQuiz] = useState([]);
  const [javaQuiz, setJavaQuiz] = useState([]);
  const [cQuiz, setCQuiz] = useState([]);
  const [haskellQuiz, setHaskellQuiz] = useState([]);

  const router = useRouter();
  const navigateTo = (route) => {
    router.push(route);
  };

  useEffect(() => {
    let local_pythonQuiz = [];
    let local_javaQuiz = [];
    let local_cQuiz = [];
    let local_haskellQuiz = [];

    for (let i = 1; i < 5; i++) {
      local_pythonQuiz.push(
        parseInt(localStorage?.getItem(`pythonQuiz${i}`) || 0)
      );
      local_javaQuiz.push(parseInt(localStorage?.getItem(`javaQuiz${i}`) || 0));
      local_cQuiz.push(parseInt(localStorage?.getItem(`cQuiz${i}`) || 0));
      local_haskellQuiz.push(
        parseInt(localStorage?.getItem(`haskellQuiz${i}`) || 0)
      );
    }

    setPythonQuiz(local_pythonQuiz);
    setJavaQuiz(local_javaQuiz);
    setCQuiz(local_cQuiz);
    setHaskellQuiz(local_haskellQuiz);
  }, []);

  function sum(array) {
    return array.reduce((pv, cv) => pv + cv, 0);
  }

  function disableButton(index) {
    const quizzes = [pythonQuiz, javaQuiz, cQuiz, haskellQuiz];
    const threshold = 74; // Anpassen der Schwelle nach Bedarf

    return (sum(quizzes[index]) * 100) / 40 <= threshold;
  }

  return (
    <div
      className={`container mx-auto p-8 ${
        isDarkMode ? "text-white" : "text-black"
      }`}
    >
      <h2
        className={`text-2xl font-bold mb-6 text-center ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Prüfung in welcher Programmiersprache?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 place-content-center">
        <button
          onClick={() => {
            window.location.href = "/exam_python";
          }}
          disabled={disableButton(0)}
          className={`text-slate-500 font-bold w-full h-full p-4 bg-slate-300 hover:bg-blue-400 rounded-lg `}
        >
          {disableButton(0) ? (
            <span role="img" aria-label="Schloss" className="ml-2">
              🔒
            </span>
          ) : (
            ""
          )}{" "}
          Python
        </button>

        <button
          onClick={() => navigateTo("/Java")}
          disabled={disableButton(1)}
          className={`text-slate-500 font-bold w-full h-full p-4 bg-slate-300 hover:bg-blue-400 rounded-lg`}
        >
          {disableButton(1) ? (
            <span role="img" aria-label="Schloss" className="ml-2">
              🔒
            </span>
          ) : (
            ""
          )}{" "}
          Java
        </button>

        <button
          onClick={() => navigateTo("/C++")}
          disabled={disableButton(2)}
          className={`text-slate-500 font-bold w-full h-full p-4 bg-slate-300 hover:bg-blue-400 rounded-lg `}
        >
          {disableButton(2) ? (
            <span role="img" aria-label="Schloss" className="ml-2">
              🔒
            </span>
          ) : (
            ""
          )}{" "}
          C++
        </button>
        <button
          onClick={() => navigateTo("/Haskell")}
          disabled={disableButton(3)}
          className={`text-slate-500 font-bold w-full h-full p-4 bg-slate-300 hover:bg-blue-400 rounded-lg `}
        >
          {disableButton(3) ? (
            <span role="img" aria-label="Schloss" className="ml-2">
              🔒
            </span>
          ) : (
            ""
          )}{" "}
          Haskell
        </button>
      </div>
    </div>
  );
};

export default Home;
