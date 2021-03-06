/* an app that creates flashcards to prepare for a quiz */
/* all credit to: Web Dev Simplyfied https://www.youtube.com/channel/UCFbNIlppjAuEX4znoulh0Cw*/
import React, { useState, useEffect } from 'react';
import FlashcardList from './FlashcardList';
import './App.css';
import axios from 'axios';

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: 'What is 4+2 ',
    answer: 6,
    options: [ 2, 3, 5, 6]
  },
  {
    id: 2,
    question: 'Where is the Snoopy?',
    answer: 'baseball',
    options: [ 'garden', 'house', 'baseball']
  },
  {
    id: 3,
    question: 'Roberta___ toys are small.',
    answer: "'s",
    options: [ 's', "'s"]
  },
  {
    id: 4,
    question: 'The square root of 64: ',
    answer: 8,
    options: [ 32, 8, 16, 256]
  }
]


function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)

  /* call axios to load questions and eecute as soon as component loads  using [] */
  useEffect(() => {
    axios
      .get('https://opentdb.com/api.php?amount=10')
      .then(res => {
        setFlashcards(res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer)
          const options = [
            ...questionItem.incorrect_answers.map(a => decodeString(a)),
            answer]
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - .5)
          }
        }))
      })
  }, [])

  function decodeString(str) {
    const textArea = document.createElement('textArea')
    textArea.innerHTML = str
    return textArea.value
  }
  return (
    <div className="container">
      <FlashcardList flashcards={flashcards} />
    </div>
  );
}


export default App;
