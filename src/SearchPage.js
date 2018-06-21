import { Link } from 'react-router-dom'
import React from 'react'
import * as BooksAPI from './BooksAPI.js'
import BookList from './BookList.js'


class SearchPage extends React.Component {
  state = {
    query: 'art',
    books: [],
  }

  updateSearchQuery = (event) => {
    const newQuery = event.target.value
    this.setState({ query: newQuery})

    BooksAPI.search(newQuery)
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className='close-search'
            to='/'
          />
          <div className="search-books-input-wrapper">
            {/*

              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" onChange={this.updateSearchQuery}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
            <BookList
              books={this.state.books}
            />
        </div>
      </div>
    )
  }
}

export default SearchPage
