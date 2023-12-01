import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function QuizProgress({ name, progress, isDarkMode }) {
  return (
    <>
      <div
        className={`flex justify-between mb-1 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        <span className="text-base font-medium ">{name}</span>
        <span className="text-sm font-medium">{(progress * 100) / 40}%</span>
      </div>
      <div className="w-full rounded-full h-2.5 bg-gray-500">
        <div
          className={`bg-indigo-400 h-2.5 rounded-full`}
          style={{
            width: `${(progress * 100) / 40}%`,
          }}
        ></div>
      </div>
    </>
  );
}

const Dashboard = ({ isDarkMode }) => {
  const [pythonQuiz, setPythonQuiz] = useState([]);
  const [javaQuiz, setJavaQuiz] = useState([]);
  const [cQuiz, setCQuiz] = useState([]);
  const [haskellQuiz, setHaskellQuiz] = useState([]);

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

  function calculateCorrectAndWrong() {
    let correctAnwer = 0;
    let wrongAnswer = 0;
    let notAnswered = 0;

    let Quizes = [pythonQuiz, javaQuiz, cQuiz, haskellQuiz];

    for (let i = 0; i < 4; i++) {
      const localStorageKeyPython = `pythonQuiz${i + 1}`;
      const localStorageValuePython =
        typeof window !== "undefined"
          ? localStorage.getItem(localStorageKeyPython)
          : null;
      console.log("localStorageValuePython", localStorageValuePython);
      const localStorageKeyJava = `javaQuiz${i + 1}`;
      const localStorageValueJava =
        typeof window !== "undefined"
          ? localStorage.getItem(localStorageKeyJava)
          : null;

      const localStorageKeyC = `cQuiz${i + 1}`;
      const localStorageValueC =
        typeof window !== "undefined"
          ? localStorage.getItem(localStorageKeyC)
          : null;

      const localStorageKeyHaskell = `haskellQuiz${i + 1}`;
      const localStorageValueHaskell =
        typeof window !== "undefined"
          ? localStorage.getItem(localStorageKeyHaskell)
          : null;

      for (let j = 0; j < 10; j++) {
        if (localStorageValuePython == null) {
          notAnswered++;
        }
        if (localStorageValueJava == null) {
          notAnswered++;
        }
        if (localStorageValueC == null) {
          notAnswered++;
        }
        if (localStorageValueHaskell == null) {
          notAnswered++;
        }
      }
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        correctAnwer += Quizes[j][i];
      }
    }

    wrongAnswer = 160 - correctAnwer - notAnswered;

    return [correctAnwer, wrongAnswer, notAnswered];
  }

  const data1 = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        hoverBackgroundColor: [
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
      },
    ],
  };

  const [correct, wrong, notAnswered] = calculateCorrectAndWrong();
  console.log("Correct, Wrong, Not Answered", correct, wrong, notAnswered);

  const newData = {
    labels:
      correct === 0 && wrong === 160 && notAnswered === 0
        ? ["Unbearbeitet"]
        : ["Richtig", "Falsch", "Unbearbeitet"],
    datasets: [
      {
        data:
          correct === 0 && wrong === 160 && notAnswered === 0
            ? [1]
            : [correct, wrong, notAnswered],
        backgroundColor:
          correct === 0 && wrong === 160 && notAnswered === 0
            ? ["rgba(128, 128, 128, 0.35)"]
            : [
                "rgba(0, 255, 0, 0.35)",
                "rgba(255, 0, 0, 0.35)",
                "rgba(128, 128, 128, 0.35)",
              ],
        borderColor:
          correct === 0 && wrong === 160 && notAnswered === 0
            ? ["rgba(128, 128, 128, 0.55)"]
            : [
                "rgba(0, 255, 0, 0.5)",
                "rgba(255, 0, 0, 0.5)",
                "rgba(128, 128, 128, 0.55)",
              ],
        hoverBackgroundColor: [
          "rgba(0, 255, 0, 0.5)",
          "rgba(255, 0, 0, 0.5)",
          "rgba(128, 128, 128, 0.5)",
        ],
      },
    ],
  };

  const router = useRouter();

  const navigateTo = (route) => {
    router.push(route);
  };

  return (
    <>
      <div
        className={`container mx-auto px-8 flex flex-col items-center 
        }`}
      >
        <div className="w-full max-w-lg p-4">
          <h2
            className={`text-2xl font-bold mb-4 text-center ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Fortschritt
          </h2>
          <QuizProgress
            name={"Python"}
            progress={sum(pythonQuiz)}
            isDarkMode={isDarkMode}
          />
          <QuizProgress
            name={"Java"}
            progress={sum(javaQuiz)}
            isDarkMode={isDarkMode}
          />
          <QuizProgress
            name={"C++"}
            progress={sum(cQuiz)}
            isDarkMode={isDarkMode}
          />
          <QuizProgress
            name={"Haskell"}
            progress={sum(haskellQuiz)}
            isDarkMode={isDarkMode}
          />
        </div>
        <p
          className={`text-base font-semibold mb-4 text-center ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Ab 75% kann die Prüfung absolviert werden
        </p>

        <h2
          className={`text-2xl font-bold mb-1 text-center ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Bearbeitungsquote
        </h2>
        <div className="w-full max-w-lg p-2 flex justify-center">
          <Pie data={newData} />
        </div>
      </div>
      <div
        className={`fixed bottom-0 left-0 right-0 ${
          isDarkMode ? "bg-gray-800" : "bg-gray-300"
        } p-4 flex justify-between rounded-lg`}
      >
        <button
          onClick={() => navigateTo("/")}
          className={`${isDarkMode ? "text-white" : "text-black"} font-bold`}
        >
          Dashboard
        </button>
        <button
          onClick={() => navigateTo("/overview")}
          className={`${isDarkMode ? "text-white" : "text-black"} font-bold`}
        >
          Übung
        </button>
        <button
          onClick={() => navigateTo("/exam")}
          className={`${isDarkMode ? "text-white" : "text-black"} font-bold`}
        >
          Prüfung
        </button>
      </div>
    </>
  );
};

export default Dashboard;
