import React from 'react'
import BookShelf from './BookShelf.js'

class ListShelves extends React.Component {
  state = {
    showSearchPage: false,
    books: {
      currentlyReading: [
        {
          title: "Harry Potter",
          author: "JK Rowling",
          imageLinks: {
            thumbnail: "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api",
          }
        },
        {
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          imageLinks: {
            thumbnail: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
          }
        }
      ],
      wantToRead: [
        {
          title: "Ender's Game",
          author: "Orson Scott Card",
          imageLinks: {
            thumbnail: "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api",
          },
        },
        {
          title: "1776",
          author: "David McCullough",
          imageLinks: {
            thumbnail: "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
          },
        }
      ],
      read: [
        {
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          imageLinks: {
            thumbnail: "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api",
          },
        },
        {
          title: "Oh, the Places You'll Go!",
          author: "Seuss",
          imageLinks: {
            thumbnail: "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api",
          },
        },
        {
          title: "The Adventures of Tom Sawyer",
          author: "Mark Twain",
          imageLinks: {
            thumbnail: "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api",
          },
        },
      ],
    },
  }

  getCurrentShelf = (book) => {
    let currentShelf;
    const shelves = Object.keys(this.state.books);
    shelves.forEach((shelf) => {
      for (let selectedBook in this.state.books[shelf]){
        if (this.state.books[shelf][selectedBook].title === book){
          currentShelf = shelf
        }
      }
    })

    if (currentShelf === undefined){
      return null
    } else {
      return currentShelf;
    }
  }

  deleteBookOnShelf = (shelf, bookToMove) => {
    let booksOnShelves = this.state.books
    let booksOnCurrentShelf = booksOnShelves[shelf];
    let updatedBooksOnShelf = booksOnCurrentShelf.filter(book => (
      book.title !== bookToMove.title
    ))
    booksOnShelves[shelf] = updatedBooksOnShelf
    // }
    if (shelf != null){
      this.setState((currentState) => ({
        books: booksOnShelves
      }))
    }
  }

  addBookToShelf = (shelf, bookToAdd) => {
    let booksOnShelves = this.state.books
    const updatedShelf = this.state.books[shelf].concat({
      title: bookToAdd.title,
      author: bookToAdd.author,
      imageLinks: {thumbnail: bookToAdd.imageLinks.thumbnail},
    });
    booksOnShelves[shelf] = updatedShelf

    this.setState((currentState) => ({
      books: booksOnShelves,
    }))
  }

  finishMovingBook = (event, book) => {
    const targetShelf = event.target.value;
    const bookToMove = book;

    const currentShelf = this.getCurrentShelf(bookToMove.title);

    if (targetShelf === currentShelf){
      console.log('cantmove')
    }

    if (targetShelf !== 'none') {
      this.addBookToShelf(targetShelf, bookToMove)
    }

    if (currentShelf !== null){
      this.deleteBookOnShelf(currentShelf, bookToMove)
    }
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
              books={this.state.books.currentlyReading}
              handleBookMove={this.finishMovingBook.bind(this)}
              currentShelf="currentlyReading"
            />
            <BookShelf
              name="Want to Read"
              books={this.state.books.wantToRead}
              handleBookMove={this.finishMovingBook.bind(this)}
              currentShelf="wantToRead"
            />
            <BookShelf
              name="Read"
              books={this.state.books.read}
              handleBookMove={this.finishMovingBook.bind(this)}
              currentShelf="read"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ListShelves
