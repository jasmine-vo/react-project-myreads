import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import BooksGrid from './BooksGrid.js'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  render() {
    const { onChangeShelf, books } = this.props
    const shelves = [{type: 'currentlyReading', title: 'Currently Reading'},
                     {type: 'wantToRead', title: 'Want to Read'},
                     {type: 'read', title: 'Read'}]

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map((shelf, index) => (
              <div className="bookshelf" key={index}>
                <h2 className="bookshelf-title">{shelf.title}</h2>
                  <div className="bookshelf-books">
                    <BooksGrid
                      books={books.filter((book) => book.shelf === shelf.type)
                        .sort(sortBy('title'))}
                      onChangeShelf={onChangeShelf}
                    />
                  </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks