import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const questions = require("../questions/pythonExercise2.json");

// Funktion zum Mischen eines Arrays
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Home = ({ isDarkMode }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [endQuiz, setEndQuiz] = useState(false);
  const [score, setScore] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // set score into localStorage
    const currentScore = localStorage.getItem("pythonQuiz2");
    if (!currentScore || score > currentScore) {
      localStorage.setItem("pythonQuiz2", score);
    }
  }, [score]);

  useEffect(() => {
    // Mische die Antwortmöglichkeiten beim Laden der Seite einmalig
    setShuffledAnswers(shuffleArray(questions[currentQuestion].answers));
  }, [currentQuestion]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        // Mische die Antwortmöglichkeiten für die nächste Frage
        setShuffledAnswers(
          shuffleArray(questions[currentQuestion + 1].answers)
        );
      } else {
        setEndQuiz(true);
      }
      setSelectedAnswer(null);
    }, 1000);
  };

  const navigateTo = (route) => {
    router.push(route);
  };

  ChartJS.register(ArcElement, Tooltip, Legend);
  const data2 = {
    labels: ["Richtig", "Falsch"],
    datasets: [
      {
        data: [score, questions.length - score],
        backgroundColor: ["#02d63b", "#FF6384"],
        hoverBackgroundColor: ["#02d63b", "#FF6384"],
      },
    ],
  };

  return (
    <div
      className={`container mx-auto p-8 ${
        isDarkMode ? "text-white" : "text-black"
      }`}
    >
      {endQuiz ? (
        <div
          className={`bg-blue p-6 rounded-lg ${
            isDarkMode ? "text-white" : "text-black"
          } text-center`}
        >
          <h2 className="text-2xl font-bold mb-4">Quiz abgeschlossen!</h2>
          <p className="text-xl">
            Richtige Antworten:{" "}
            <span className="font-bold text-green-500">{score}</span>
          </p>
          <p className="text-xl">
            Falsche Antworten:{" "}
            <span className="font-bold text-red-500">
              {questions.length - score}
            </span>
          </p>
          <div className="w-full max-w-lg p-4 mx-auto">
            <Pie data={data2} />
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => {
                setEndQuiz(false);
                navigateTo("/overview");
              }}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Zurück
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2
            className={`text-2xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Frage {currentQuestion + 1}: {questions[currentQuestion].question}
          </h2>
          <div className="space-y-4">
            {shuffledAnswers.map((answer, index) => (
              <button
                key={index}
                className={`${
                  selectedAnswer === answer
                    ? answer === questions[currentQuestion].correctAnswer
                      ? "bg-green-500 text-white hover:scale-110"
                      : "bg-red-500 text-white hover:scale-110"
                    : "bg-slate-500 text-white hover:scale-100"
                } p-3 rounded w-full transition duration-300 ease-in-out transform hover:scale-100`}
                onClick={() => handleAnswerClick(answer)}
                disabled={selectedAnswer}
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
