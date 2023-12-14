const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const bodyParser = require('body-parser');


app.use(bodyParser.json());

app.set('view engine', 'pug');

app.listen(port);

app.get('/', (req, res) =>{
    res.render('homePage', { title: 'Home Page', message: 'Welcome to our website!' });
});


app.get('/books', (req, res) => {
    fs.readFile('./books.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      const books = JSON.parse(data);  
      res.render('books', { books });
    });
});


app.get('/books/:id', (req, res) => {
  const bookId = req.params.id;

  fs.readFile('./books.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading books.json:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const books = JSON.parse(data);
    const book = books.find(i => i.id == bookId);
    if (!book) {
      res.status(404).send('Book not found');
      return;
    }

    res.render('bookDetails', { book });
  });
});


app.post('/books', (req, res) => {
    const newBook = req.body;
  
    fs.readFile('./books.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading books.json:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      let books = JSON.parse(data);
        books.push(newBook);
  
      fs.writeFile('./books.json', JSON.stringify(books, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error writing to books.json:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
  
        res.status(201).send('Book added successfully');
      });
    });
});


app.use((req, res) => {
    res.status(404).render('404', { title : '404'});
});