// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let Book = require('../models/books');
const books = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  Book.find((err, books) => {
    if (err) {
      return console.error(err);
    } else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });
});

// GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/details', { 
    books: books,
    title: 'Add a Book'
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  const { title, price, author, genre } = req.body;
  const newBook = new Book({
    Title: title,
    Price: price,
    Author: author,
    Genre: genre
  });

  newBook.save((err, book) => {
    if (err) {
      console.log(err);
    } else {
      console.log('New book added:', book);
    }
    res.redirect('/books/details/' + book._id); // Redirect to the BookDetails page with the newly created book's ID
  });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Book.findById(id, (err, book) => {
    if (err) {
      console.log(err);
    } else {
      res.render('books/details', {
        title: 'Edit Book',
        book: book
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  const id = req.params.id;
  const { title, price, author, genre } = req.body;
  const updatedBook = {
    Title: title,
    Price: price,
    Author: author,
    Genre: genre
  };

  Book.findByIdAndUpdate(id, updatedBook, (err, book) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Book updated:', book);
    }
    res.redirect('/books');
  });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  const id = req.params.id;
  Book.findByIdAndRemove(id, (err, book) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Book deleted:', book);
    }
    res.redirect('/books');
  });
  
});


module.exports = router;
