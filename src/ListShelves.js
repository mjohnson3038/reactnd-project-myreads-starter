import PropTypes from 'prop-types';
import React from 'react'
import BookShelf from './BookShelf.js'


class ListShelves extends React.Component {
  passChangeShelf = (event, book) => {
    event.preventDefault()
    this.props.handleBookMove(event, book)
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
              books={this.props.books.currentlyReading}
              passChangeShelf={this.passChangeShelf.bind(this)}
              currentShelf="currentlyReading"
            />
            <BookShelf
              name="Want to Read"
              books={this.props.books.wantToRead}
              passChangeShelf={this.passChangeShelf.bind(this)}
              currentShelf="wantToRead"
            />
            <BookShelf
              name="Read"
              books={this.props.books.read}
              passChangeShelf={this.passChangeShelf.bind(this)}
              currentShelf="read"
            />
          </div>
        </div>
      </div>
    )
  }
}

BookShelf.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    imageLinks: PropTypes.objectOf({
      thumbnail: PropTypes.string,
    }),
  })),
  handleBookMove: PropTypes.func.isRequired,
}

export default ListShelves
