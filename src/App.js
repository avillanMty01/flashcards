/* an app that creates flashcards to prepare for a quiz */
/* all credit to: Web Dev Simplyfied https://www.youtube.com/channel/UCFbNIlppjAuEX4znoulh0Cw*/
import React, { useState } from 'react';
import FlashcardList from './FlashcardList';

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: 'What is 4+2 ',
    answer: 4,
    options: [ 2, 3, 5, 6]
  },
  {
    id: 2,
    question: 'Where is the Snoopy?',
    answer: 4,
    options: [ 'garden', 'house', 'baseball']
  },
  {
    id: 3,
    question: 'Roberta___ toys are small.',
    answer: 4,
    options: [ 's', "'s"]
  },
  {
    id: 4,
    question: 'The square root of 64: ',
    answer: 4,
    options: [ 32, 8, 16, 256]
  }
]


function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)

  return (
    <FlashcardList flashcards={flashcards} />
  );
}




export default App;
