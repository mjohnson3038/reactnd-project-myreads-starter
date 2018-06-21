import React from 'react'
import { Link, Route } from 'react-router-dom'
import ListShelves from './ListShelves.js'
import SearchPage from './SearchPage.js'
import './App.css'


class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchPage/>
        )} />
        <Route exact path='/' render={() => (
          <div>
            <ListShelves />
            <div className="open-search">
              <Link
                className='close-create-contact'
                to='/search'
              >
                  Add a book
              </Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
