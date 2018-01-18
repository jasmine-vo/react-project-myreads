import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid.js'

class SearchBook extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    showingBooks: []
  }

  updateQuery = (e) => {

    const query = e.target.value

    this.setState({ query: query })

    // checks if query exists/text was inputed in search bar
    if (query) {

      // use regex to remove special characters from query and ignore cases
      const match = new RegExp(escapeRegExp(query), 'i')

      // get books from bookshelf that match query
      const bookshelf = this.props.books.filter((book) => (
        match.test(book.authors.join(' ')) || match.test(book.title)))

      // search backend server for books that match query
      BooksAPI.search(query, 20).then((results) => {
        results.length > 0 ?

          // loads books if there are results from server/bookshelf
          // if there is no match, does not load any books
          this.setState({ showingBooks: results.filter(result => bookshelf.every(book => book.id !== result.id))
            .concat(bookshelf)
            .sort(sortBy('title'))
          }) : this.setState({ showingBooks: bookshelf.sort(sortBy('title')) })
      })
    } else {
      this.setState({ showingBooks: [] })
    }
  }

  render() {

    const { query, showingBooks } = this.state
    const { onChangeShelf } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/"
          >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.updateQuery}
            />
          </div>
        </div>
        <div className="search-books-results">
          {query !== '' ?
          <BooksGrid 
            books={showingBooks}
            onChangeShelf={onChangeShelf}
          /> : <div></div>}
        </div>
      </div>
    )
  }
}

export default SearchBook