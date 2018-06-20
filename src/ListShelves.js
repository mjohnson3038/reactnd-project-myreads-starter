import React from 'react'
import BookShelf from './BookShelf.js'

class ListShelves extends React.Component {
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
      </div>
    )
  }
}

export default ListShelves
