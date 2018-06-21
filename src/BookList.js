import React from 'react'
import PropTypes from 'prop-types';
import Book from './Book.js'


class BookList extends React.Component {
  passChangeBookPosition = (event) => {
    event.preventDefault()
    this.props.handleBookMove(event)
  }

  render() {
    return (
      <ol className="books-grid">
        {
          this.props.books.map(book => (
            <li key={book.title}>
              <Book
                book={book}
                onChangeShelf={this.passChangeBookPosition}
                currentShelf={this.props.currentShelf}
              />
            </li>
          ))
        }
      </ol>
    );
  }
}

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  })),
}

export default BookList
