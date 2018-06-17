import React from 'react'
// import * as BooksAPI from './BooksAPI'
import Book from './Book.js'
import './App.css'

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    booksInProgress: [
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
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                        this.state.wantToRead.map(book => (
                          <li>
                            <Book 
                              title={book.title}
                              author={book.author}
                            />
                          </li>
                        ))
                      }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                        this.state.booksInProgress.map(book => (
                          <li>
                            <Book 
                              title={book.title}
                              author={book.author}
                            />
                          </li>
                        ))
                      }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                        this.state.read.map(book => (
                          <li>
                            <Book 
                              title={book.title}
                              author={book.author}
                            />
                          </li>
                        ))
                      }
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
