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

// load books currently on shelf from BooksAPI after component is mounted
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = (book, shelf) => {
    // update the book with new shelf status
    book.shelf = shelf

    // remove book with old shelf status
    const updatedShelf = this.state.books.filter((b) => b.id !== book.id)

    // add book with new shelf status and load all books in shelf
    this.setState((state) => ({
      books: updatedShelf.concat([ book ])
    }))

    // update backend server with the book's new shelf status
    BooksAPI.update(book, shelf)
  }

  render() {

    const { books } = this.state

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div>
            <ListBooks
              books={books}
              onChangeShelf={this.changeShelf}
            />
            <div className="open-search">
              <Link
                to="/search"
              >Add a book</Link>
            </div>
          </div>
          )}/>
        <Route path="/search" render={() => (
          <SearchBook
            books={books}
            onChangeShelf={this.changeShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp