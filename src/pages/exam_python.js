import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const questions = require("../questions/pythonExam.json");

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
  const [shuffledData, setShuffledData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Mische die Fragen zu Beginn einmalig
    const shuffledQuestions = shuffleArray(questions);
    setShuffledData(
      shuffledQuestions.map((question) => ({
        ...question,
        answers: shuffleArray(question.answers),
      }))
    );
    console.log("shuffled", shuffledData);
  }, []);

  useEffect(() => {
    // setze die durchgemischten Antworten beim Wechsel zur nächsten Frage
    const shuffledAnswers = shuffleArray(questions[currentQuestion].answers);
    setShuffledData((prevData) => {
      const updatedData = [...prevData];
      updatedData[currentQuestion] = {
        ...questions[currentQuestion],
        answers: shuffledAnswers,
      };
      return updatedData;
    });
  }, [currentQuestion]);

  useEffect(() => {
    const currentScore = localStorage.getItem("pythonExam");
    if (!currentScore || score > currentScore) {
      localStorage.setItem("pythonExam", score);
    }
  }, [score]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    if (answer === shuffledData[currentQuestion]?.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
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
        backgroundColor: ["#02d63b","#FF6384"],
        hoverBackgroundColor: ["#02d63b", "#FF6384"],
      },
    ],
  };

  return (
    <>
      {endQuiz ? (
        <div
          className={`container mx-auto p-8 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          <div
            className={`bg-blue p-6 rounded-lg ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              Quiz abgeschlossen!
            </h2>
            <div className="space-y-4 text-center">
              <p
                className={`text-xl ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Richtige Antworten:{" "}
                <span className="font-bold text-green-500">{score}</span>
              </p>
              <p
                className={`text-xl ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Falsche Antworten:{" "}
                <span className="font-bold text-red-500">
                  {questions.length - score}
                </span>
              </p>
              <div className="w-full max-w-lg p-4">
                <Pie data={data2} />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setEndQuiz(false);
                  navigateTo("/exam");
                }}
                className="mt-4 mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-center"
              >
                Zurück
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className={`container mx-auto p-8 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            <h2
              className={`text-2xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Frage {currentQuestion + 1}:{" "}
              {shuffledData[currentQuestion]?.question}
            </h2>
            <div className="space-y-4">
              {shuffledData[currentQuestion]?.answers.map((answer, index) => (
                <button
                  key={index}
                  className={`p-3 rounded w-full transition duration-300 ease-in-out transform hover:scale-110 bg-slate-500 text-white`}
                  onClick={() => handleAnswerClick(answer)}
                  disabled={selectedAnswer}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
