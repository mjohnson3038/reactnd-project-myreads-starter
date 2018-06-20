import React from 'react'
import PropTypes from 'prop-types';
import Book from './Book.js'


class BookShelf extends React.Component {
  passChangeShelf = (event) => {
    event.preventDefault()
    this.props.handleBookMove(event)
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.props.books.map(book => (
                <li key={book.title}>
                  <Book
                    title={book.title}
                    author={book.author}
                    onChangeShelf={this.passChangeShelf}
                    currentShelf={this.props.currentShelf}
                  />
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  })),
}

export default BookShelf
