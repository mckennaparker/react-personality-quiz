import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserForm from './components/UserForm';
import Results from './components/Results';
import Question from './components/Question';
import Header from './components/Header';

export default function App() {
  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"]
    },
    {
      question: "What's your favorite animal?",
      options: ["Dog", "Cat", "Bird", "Fish"]
    },
    {
      question: "What's your favorite food?",
      options: ["Pizza", "Pasta", "Burger", "Salad"]
    },
    {
      question: "What's your favorite movie genre?",
      options: ["Action", "Comedy", "Horror", "Romance"]
    }
  ];

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };

  const elements = {
    "Red 🔴": "fire",
    "Blue 🔵": "water",
    "Green 🟢": "earth",
    "Yellow 🟡": "air",
    "Dog": "fire",
    "Cat": "water",
    "Bird": "air",
    "Fish": "earth",
    "Pizza": "fire",
    "Pasta": "water",
    "Burger": "earth",
    "Salad": "air",
    "Action": "fire",
    "Comedy": "water",
    "Horror": "earth",
    "Romance": "air",
  }

  let [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  let [answers, setAnswers] = useState([]);
  let [userName, setUserName] = useState("");
  let [element, setElement] = useState("");
  let [artwork, setArtwork] = useState(null);

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function handleUserFormSubmit(name) {
    setUserName(name);
  }

  function determineElement(answers) {
    const counts = {};
    answers.forEach(function(answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function(a, b) {
      return counts[a] > counts[b] ? a : b
    });
  }

  function fetchImage() { 
  }

  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        fetchImage(keywords[selectedElement]);
      }
    },
    [currentQuestionIndex]
  );

  return (
    <UserForm.Provider value={{ name: userName, setName: setUserName }}>
      <Header />
      <Routes>
        <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
        <Route 
          path="/quiz"
          element={
            currentQuestionIndex < questions.length ? (
              <Question question={questions[currentQuestionIndex].question} options={questions[currentQuestionIndex].options} onAnswer={handleAnswer} />
            ) : (
              <Results element={element} artwork={artwork} />
            )
          } 
          />
      </Routes>
    </UserForm.Provider>
  );
}
