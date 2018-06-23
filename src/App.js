import React from 'react'
import { Link, Route } from 'react-router-dom'
import ListShelves from './ListShelves.js'
import SearchPage from './SearchPage.js'
import './App.css'


class BooksApp extends React.Component {
  state = {
    books: {
      currentlyReading: [
        {
          title: "Wormwood",
          id: "C9Y0AAAAMAAJ",
          author: ["Marie Corelli"],
          imageLinks: {
            thumbnail: "http://books.google.com/books/content?id=C9Y0AAAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          }
        },
        {
          title: "Open Source Web Development with LAMP",
          id: "HbUhv8aKIk4C",
          author: ["James Lee", "Brent Ware"],
          imageLinks: {
            thumbnail: "http://books.google.com/books/content?id=HbUhv8aKIk4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          }
        }
      ],
      wantToRead: [
        {
          title: "Mobile Robotics in Healthcare",
          id: "jT__IKy9wTgC",
          author: ["Nikos Katevas"],
          imageLinks: {
            thumbnail: "http://books.google.com/books/content?id=jT__IKy9wTgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          },
        },
        {
          title: "Satire and allegory in Wynnere and Wastoure",
          id: "gnxbAAAAMAAJ",
          author: ["Thomas Howard Bestul"],
          imageLinks: {
            thumbnail: "http://books.google.com/books/content?id=gnxbAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
          },
        }
      ],
      read: [
        {
          title: "50 Games for Going Green",
          id: "P3nBuVzVGrEC",
          author: ["Carol Scaini", "Carolyn Evans"],
          imageLinks: {
            thumbnail: "http://books.google.com/books/content?id=P3nBuVzVGrEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          },
        },
      ],
    },
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
      author: bookToAdd.author,
      imageLinks: {thumbnail: bookToAdd.imageLinks.thumbnail},
    });
    booksOnShelves[shelf] = updatedShelf

    this.setState((currentState) => ({
      books: booksOnShelves,
    }))
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
