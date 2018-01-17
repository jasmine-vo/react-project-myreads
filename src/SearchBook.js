import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'

class SearchBook extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  state = {
    query: '',
    showingBooks: []
  }

  updateQuery = (e) => {
    this.setState({ query: e.target.value })
    console.log(this.state.query)
    
    if (this.state.query !== '') {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      let bookshelf = this.props.books.filter((book) => match.test(book.authors.join(' ')) || match.test(book.title))
      
      BooksAPI.search(this.state.query, 20).then((books) => {
      books.length > 0 ? this.setState({ showingBooks: books.concat(bookshelf).sort(sortBy('title')) }) : this.setState ({ showingBooks: bookshelf.sort(sortBy('title')) })
      console.log(this.state.showingBooks)
      })
    } else {
      this.setState({ showingBooks: [] })
    } 
  }

  render() {

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
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
              value={this.state.query}
              onChange={this.updateQuery}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.query !== '' ? this.state.showingBooks.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select defaultValue={book.shelf} onChange={(event) => this.props.onChangeShelf(book, event.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title && book.title}</div>
                  <div className="book-authors">{book.authors && book.authors.join(", ")}</div>
                </div>
              </li>
            )) : <div></div>}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBook