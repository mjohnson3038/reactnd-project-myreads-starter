import React from 'react'
import { Link, Route } from 'react-router-dom'
import ListShelves from './ListShelves.js'
import SearchPage from './SearchPage.js'
import './App.css'


class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
  }

  getCurrentShelf = (book) => {
    let currentShelf;
    const shelves = Object.keys(this.state.books);
    shelves.forEach((shelf) => {
      for (let selectedBook in this.state.books[shelf]){
        if (this.state.books[shelf][selectedBook].title === book){
          currentShelf = shelf
        }
      }
    })
    return currentShelf;
  }

  deleteBookOnShelf = (shelf, bookToMove) => {
    let booksOnShelves = this.state.books
    let booksOnCurrentShelf = booksOnShelves[shelf];
    let updatedBooksOnShelf = booksOnCurrentShelf.filter(book => (
      book.title !== bookToMove
    ))
    booksOnShelves[shelf] = updatedBooksOnShelf
    // }
    if (shelf != null){
      this.setState((currentState) => ({
        books: booksOnShelves
      }))
    }
  }

  addBookToShelf = (shelf, bookToAdd, author) => {
    let booksOnShelves = this.state.books
    const updatedShelf = this.state.books[shelf].concat({title: bookToAdd, author: author});
    booksOnShelves[shelf] = updatedShelf

    this.setState((currentState) => ({
      books: booksOnShelves,
    }))
  }

  finishMovingBook = (event) => {
    event.preventDefault()

    const targetShelf = event.target.value;
    const bookToMove = event.target.name;
    // is there a better place to store the authors name?
    const author = event.target.className;
    console.log(event);
    const currentShelf = this.getCurrentShelf(bookToMove);

    if (targetShelf === currentShelf){
    }

    if (targetShelf !== 'none') {
      this.addBookToShelf(targetShelf, bookToMove, author)
    }
    this.deleteBookOnShelf(currentShelf, bookToMove)
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchPage/>
        )} />
        <Route exact path='/' render={() => (
          <div>
            <ListShelves />
            <div className="open-search">
              <Link
                className='close-create-contact'
                to='/search'
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
