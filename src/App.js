import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks.js'
import SearchBook from './SearchBook.js'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }
componentDidMount() {
  BooksAPI.getAll().then((books) => {
    this.setState({ books })
  })
}
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div>
            <ListBooks />
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
          )}/>
        <Route path="/search" render={() => (
          <SearchBook books={this.state.books} />
          )}/>
      </div>
    )
  }
}

export default BooksApp