import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf.js'
import './App.css'

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: {
      currentlyReading: [
        {
          title: "Harry Potter",
          author: "JK Rowling",
        },
        {
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
        }
      ],
      wantToRead: [
        {
          title: "Ender's Game",
          author: "Orson Scott Card",
        },
        {
          title: "1776",
          author: "David McCullough",
        }
      ],
      read: [
        {
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
        },
        {
          title: "Oh, the Places You'll Go!",
          author: "Seuss",
        },
        {
          title: "The Adventures of Tom Sawyer",
          author: "Mark Twain",
        },
      ],
    },
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
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  name="Currently Reading"
                  books={this.state.books.currentlyReading}
                  handleBookMove={this.finishMovingBook}
                  currentShelf="currentlyReading"
                />
                <BookShelf
                  name="Want to Read"
                  books={this.state.books.wantToRead}
                  handleBookMove={this.finishMovingBook}
                  currentShelf="wantToRead"
                />
                <BookShelf
                  name="Read"
                  books={this.state.books.read}
                  handleBookMove={this.finishMovingBook}
                  currentShelf="read"
                />
              </div>
            </div>
            <div className="open-search">
              <Link
                className='close-create-contact'
                to='/search'
                onClick={() => this.setState({ showSearchPage: true })}
              >
                  Add a book
              </Link>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
