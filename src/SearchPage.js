import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import React from 'react'

import * as BooksAPI from './BooksAPI.js'
import BookList from './BookList.js'


class SearchPage extends React.Component {
  state = {
    query: '',
    books: [],
  }

  updateSearchQuery = (event) => {
    const newQuery = event.target.value
    this.setState({ query: newQuery})

    BooksAPI.search(newQuery)
      .then((books) => {
        if (books instanceof Array){
          this.setState(() => ({
            books
          }))
        } else {
          this.setState((currentState) => ({
            books: [],
          }))
        }
      })
  }

  passAddBookToShelf = (event, book) => {
    this.props.handleBookMove(event, book)
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className='close-search'
            to='/'
            state={this.props.currentState}
          />
          <div className="search-books-input-wrapper">
            {/*

              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" onChange={this.updateSearchQuery.bind(this)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
            <BookList
              books={this.state.books}
              passChangeBookPosition={this.passAddBookToShelf.bind(this)}
              currentState={this.props.currentState}
            />
        </div>
      </div>
    )
  }
}

SearchPage.propTypes = {
  handleBookMove: PropTypes.func.isRequired,
  currentState: PropTypes.shape({
    books: PropTypes.shape({
      currentlyReading: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        authors: PropTypes.arrayOf(PropTypes.string).isRequired,
        imageLinks: PropTypes.shape({
          thumbnail: PropTypes.string,
        }),
      })),
      wantToRead: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        authors: PropTypes.arrayOf(PropTypes.string).isRequired,
        imageLinks: PropTypes.shape({
          thumbnail: PropTypes.string,
        }),
      })),
      read: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        authors: PropTypes.arrayOf(PropTypes.string).isRequired,
        imageLinks: PropTypes.shape({
          thumbnail: PropTypes.string,
        }),
      })),
    }),
  }),
}

export default SearchPage
