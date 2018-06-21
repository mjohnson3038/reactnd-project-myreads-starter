import React from 'react'
import PropTypes from 'prop-types';
// import * as BooksAPI from './BooksAPI'

class Book extends React.Component {
  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.book.image}")` }}></div>
          <div className="book-shelf-changer">
            <select onChange={this.props.onChangeShelf} name={this.props.book.title} class={this.props.book.image} id={this.props.book.author} value={this.props.currentShelf}>
              <option value="move" book={this.props.book} disabled>Move to...</option>
              <option value="currentlyReading" book={this.props.book}>Currently Reading</option>
              <option value="wantToRead" book={this.props.book}>Want to Read</option>
              <option value="read" book={this.props.book}>Read</option>
              <option value="none" book={this.props.book}>None</option>
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
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
}

export default Book
