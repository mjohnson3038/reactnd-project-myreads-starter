import React from 'react'
import PropTypes from 'prop-types';
import BookList from './BookList.js'


class BookShelf extends React.Component {
  passChangeShelf = (event, book) => {
    event.preventDefault()
    this.props.passChangeShelf(event, book)
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.name}</h2>
        <div className="bookshelf-books">
          <BookList
            books={this.props.books}
            currentShelf={this.props.currentShelf}
            passChangeBookPosition={this.passChangeShelf}
          />
        </div>
      </div>
    );
  }
}

BookShelf.propTypes = {
  name: PropTypes.string.isRequired,
  currentShelf: PropTypes.string,
  books: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    imageLinks: PropTypes.objectOf({
      thumbnail: PropTypes.string,
    }),
  })),
  passChangeShelf: PropTypes.func.isRequired,
}

export default BookShelf
