import React from 'react'
import PropTypes from 'prop-types';
// import * as BooksAPI from './BooksAPI'

class Book extends React.Component {
  getBookContext = (event) => {
    const book = this.props.book;
    this.props.onChangeShelf(event, book)
    console.log('getting book context')
  }

  getBookCover = () => {
    if (this.props.book.imageLinks !== undefined){
      return `url("${this.props.book.imageLinks.thumbnail}")`
    } else {
      return null
    }
  }

  render() {
    console.log(this.props.book)

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: this.getBookCover() }}></div>
          <div className="book-shelf-changer">
            <select onChange={this.getBookContext.bind(this)} name={this.props.book.title} value={this.props.currentShelf}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.author}</div>
      </div>
    );
  }
}

Book.propTypes = {
  // Shape of book's object depends on if it is being passed in through BookShelf or SearchPage
  books: PropTypes.arrayOf(PropTypes.object),
  onChangeShelf: PropTypes.func.isRequired,
}

export default Book
