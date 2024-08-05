import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Question from './components/Question';
import Results from './components/Results';
import UserForm from './components/UserForm';
import { UserProvider } from './components/UserContext';
import './index.css';

function App() {
  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },
    {
      question: "What's your favorite season?",
      options: ["Spring 🌸", "Summer 🌞", "Fall 🍂", "Winter ❄️"],
    },
    {
      question: "What's your favorite element?",
      options: ["Fire 🔥", "Water 💧", "Earth 🌍", "Air 💨"],
    }
  ];

	const keywords = {
		Flounder: "flounder",
		Pascal: "pascal",
		Olaf: "olaf",
		Abu: "abu",
	};

	const elements = {
		"Red 🔴": "abu",
    "Blue 🔵": "olaf",
    "Green 🟢": "pascal",
    "Yellow 🟡": "flounder",
    "Spring 🌸": "pascal",
    "Summer 🌞": "olaf",
    "Fall 🍂": "abu",
    "Winter ❄️": "flounder",
    "Fire 🔥": "abu",
    "Water 💧": "olaf",
    "Earth 🌍": "pascal",
    "Air 💨": "flounder",
	};

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [answers, setAnswers] = useState([]);
	const [userName, setUserName] = useState('');
	const [element, setElement] = useState('');
	const [artwork, setArtwork] = useState(null);

	function handleAnswer(answer) {
		setAnswers([...answers, answer]);
		setCurrentQuestionIndex(currentQuestionIndex + 1);
	}

	function handleUserFormSubmit(name) {
		setUserName(name);
	}

	function determineElement(answers) {
		const counts = {};
		answers.forEach((answer) => {
			const element = elements[answer];
			counts[element] = (counts[element] || 0) + 1;
		});

		return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
	}

  function fetchArtwork() {
    const randomId = Math.floor(Math.random() * 7438) + 1;
    fetch(`https://api.disneyapi.dev/character/${randomId}`)
      .then((response) => response.json())
      .then((data) => setArtwork(data))
      .catch((error) => console.error(error));
  }

	useEffect(() => {
		if (currentQuestionIndex === questions.length) {
      const selectedElement = determineElement(answers);
      setElement(selectedElement);
      fetchArtwork();
		}
	}, [currentQuestionIndex]);

	return (
		<UserProvider value={{ name: userName, setName: setUserName }}>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<UserForm onSubmit={handleUserFormSubmit} />}
        />
        <Route
          path="/quiz"
          element={
            currentQuestionIndex < questions.length ? (
              <Question
                question={questions[currentQuestionIndex].question}
                options={questions[currentQuestionIndex].options}
                onAnswer={handleAnswer}
              />
            ) : (
              <Results element={element} artwork={artwork} />
            )
          }
        />
      </Routes>
		</UserProvider>
  );
}

export default App;
