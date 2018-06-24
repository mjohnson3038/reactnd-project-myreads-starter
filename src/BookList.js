import React from 'react'
import PropTypes from 'prop-types';
import Book from './Book.js'


class BookList extends React.Component {
  passChangeBookPosition = (event, book) => {
    this.props.passChangeBookPosition(event, book)
  }

  getCurrentShelf = (bookToInsepct) => {
    // when a book gets passed in through the SearchPage component, it doesn't have a currentShelf. We must check if it has a shelf, add it or set it to none.
    if (this.props.currentShelf === undefined){
      // only happens when currentShelf is undefined, ie only need to pass in currentState through props through SearchPage
      const shelvesOfBooks = this.props.currentState.books;
      let currentShelf;
      const shelves = Object.keys(shelvesOfBooks);
      shelves.forEach((shelf) => {
        if (shelvesOfBooks[shelf].filter(book => (
          bookToInsepct.id === book.id
        )).length > 0){
          currentShelf = shelf
        }
      })

      if (currentShelf === undefined){
        return "none";
      } else {
        return currentShelf;
      }
    } else {
      return this.props.currentShelf
    }
  }

  render() {
    return (
      <ol className="books-grid">
        {
          this.props.books.map(book => (
            <li key={book.title}>
              <Book
                book={book}
                onChangeShelf={this.passChangeBookPosition.bind(this)}
                currentShelf={this.getCurrentShelf(book)}
              />
            </li>
          ))
        }
      </ol>
    );
  }
}

BookList.propTypes = {
  currentShelf: PropTypes.string,
  // Shape of books' object depends on if it is being passed in through BookShelf or SearchPage
  books: PropTypes.arrayOf(PropTypes.object),
  passChangeBookPosition: PropTypes.func.isRequired,
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

export default BookList
