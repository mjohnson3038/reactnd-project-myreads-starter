import React from 'react'
import PropTypes from 'prop-types';
import BookList from './BookList.js'


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
          <BookList
            books={this.props.books}
            currentShelf={this.props.currentShelf}
            handleBookMove={this.props.handleBookMove}
            onChangeShelf={this.passChangeShelf}
          />
        </div>
      </div>
    );
  }
}

BookShelf.propTypes = {
  name: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  })),
}

export default BookShelf
