/* an app that creates flashcards to prepare for a quiz */
/* all credit to: Web Dev Simplyfied https://www.youtube.com/channel/UCFbNIlppjAuEX4znoulh0Cw*/
import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './FlashcardList';
import './App.css';
import axios from 'axios';


function App() {
  const [flashcards, setFlashcards] = useState([])
  const[categories, setCategories] = useState([])
  const categoryEl= useRef()
  const amountEl= useRef()

  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then(res => {
        setCategories(res.data.trivia_categories)
      })
  }, [])

  /* call axios to load questions and eecute as soon as component loads  using [] 
  useEffect(() => {

  }, [])*/

  function decodeString(str) {
    const textArea = document.createElement('textArea')
    textArea.innerHTML = str
    return textArea.value
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios
      .get('https://opentdb.com/api.php', {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value
        }
      })
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
  }

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category: </label>
          <select id="category" ref={categoryEl}>
          {categories.map(category => {
            return <option value={category.id} key={category.id}>{category.name}
            </option>
          })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of questions: </label>
          <input type="number" id="amount" min="1" step="1" defaultValue={10} ref= {amountEl} />
        </div>
        <div className="form-group">
          <button className="btn">Get questions</button>
        </div>
      </form>
      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}


export default App;
