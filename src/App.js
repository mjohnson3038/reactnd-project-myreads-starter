import React from 'react'
import { Link, Route } from 'react-router-dom'

import * as BooksAPI from './BooksAPI.js'
import ListShelves from './ListShelves.js'
import SearchPage from './SearchPage.js'
import './App.css'


class BooksApp extends React.Component {
  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    },
  }

  getInitialState() {
    // if the key exists in localStorage
    if (localStorage.hasOwnProperty('books')) {
      // get the 'books''s value from localStorage
      let value = localStorage.getItem('books');

      value = JSON.parse(value);
      this.setState({ 'books': value });
    }
  }

  componentDidMount() {
    this.getInitialState();

    window.addEventListener(
      "beforeunload",
      this.saveState.bind(this)
    )
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveState.bind(this)
    )
    this.saveState();
  }

  getCurrentShelf = (book) => {
    let currentShelf;
    const shelves = Object.keys(this.state.books);
    shelves.forEach((shelf) => {
      for (let selectedBook in this.state.books[shelf]){
        if (this.state.books[shelf][selectedBook].id === book.id){
          currentShelf = shelf
        }
      }
    })

    if (currentShelf === undefined){
      return null
    } else {
      return currentShelf;
    }
  }

  deleteBookOnShelf = (shelf, bookToMove) => {
    let booksOnShelves = this.state.books
    let booksOnCurrentShelf = booksOnShelves[shelf];
    let updatedBooksOnShelf = booksOnCurrentShelf.filter(book => (
      book.id !== bookToMove.id
    ))
    booksOnShelves[shelf] = updatedBooksOnShelf
    // }
    if (shelf != null){
      this.setState((currentState) => ({
        books: booksOnShelves
      }))
    }
  }

  addBookToShelf = (shelf, bookToAdd) => {
    let booksOnShelves = this.state.books
    const updatedShelf = this.state.books[shelf].concat({
      title: bookToAdd.title,
      id: bookToAdd.id,
      authors: bookToAdd.authors,
      imageLinks: {thumbnail: bookToAdd.imageLinks.thumbnail},
    });
    booksOnShelves[shelf] = updatedShelf

    BooksAPI.update(bookToAdd.id, shelf)
      .then(() => {
        this.setState((currentState) => ({
          books: booksOnShelves,
        }))
      })
  }

  finishMovingBook = (event, bookToMove) => {
    const targetShelf = event.target.value;
    const currentShelf = this.getCurrentShelf(bookToMove);

    if (targetShelf !== 'none') {
      this.addBookToShelf(targetShelf, bookToMove)
    }

    if (currentShelf !== null){
      this.deleteBookOnShelf(currentShelf, bookToMove)
    }
  }

  saveState() {
    localStorage.setItem('books', JSON.stringify(this.state['books']))
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchPage
            handleBookMove={this.finishMovingBook.bind(this)}
            currentState={this.state}
          />
        )} />
        <Route exact path='/' render={() => (
          <div>
            <ListShelves
              handleBookMove={this.finishMovingBook.bind(this)}
              books={this.state.books}
              currentState={this.state}
            />
            <div className="open-search">
              <Link
                className='close-create-contact'
                to='/search'
                state={this.props.state}
              >
                  Add a book
              </Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
