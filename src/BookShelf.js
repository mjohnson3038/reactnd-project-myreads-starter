import React from 'react'
import PropTypes from 'prop-types';
import Book from './Book.js'


class BookShelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.props.books.map(book => (
                <li key={book.title}>
                  <Book
                    title={book.title}
                    author={book.author}
                    onChangeShelf={this.handleBookMove}
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