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

  changeShelf = (book, shelf) => {
    book.shelf = shelf
    let updatedShelf = this.state.books.filter((b) => b.id !== book.id)
    this.setState((state) => ({
      books: updatedShelf.concat([ book ])
    }))
    BooksAPI.update(book, shelf)
  }
                                       
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div>
            <ListBooks books={this.state.books} onChangeShelf={this.changeShelf} />
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
          )}/>
        <Route path="/search" render={() => (
          <SearchBook books={this.state.books} onChangeShelf={this.changeShelf} />
          )}/>
      </div>
    )
  }
}

export default BooksApp