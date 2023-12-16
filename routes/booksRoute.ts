import express, { Router, Request, Response } from 'express';
import { Book, readBooksFromFile, writeBooksToFile, search } from '../services/books';

const router: Router = express.Router();
const booksFilePath = './books/books.json';

router.get('/', async (req: Request, res: Response) => {
  try {
    const books = await readBooksFromFile(booksFilePath);
    res.render('books', { books });
  } catch (err) {
    console.error('Error reading file:', err);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/search', async (req, res) => {
    const query = req.query.q;
  
    if (!query) {
      return res.status(400).send('Missing query parameter');
    }
  
    try {
      const filteredBooks = await search(query.toString());
      return res.json(filteredBooks);
    } catch (err) {
      console.error('Error during search:', err);
      return res.status(500).send('Internal Server Error');
    }
});

router.get('/:id', async (req: { params: { id: number } }, res: Response) => {
  const bookId: number = req.params.id;

  if (isNaN(bookId)) {
    res.status(400).send('Invalid ID');
    return;
  }

  try {
    const books = await readBooksFromFile(booksFilePath);
    const book = books.find((i: { id: number }) => i.id == bookId);

    if (!book) {
      res.status(404).send('Book not found');
      return;
    }

    res.render('bookDetails', { book });
  } catch (err) {
    console.error('Error reading file:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req: { body: Book }, res: Response) => {
  const newBook: Book = req.body;
  newBook.id = +newBook.id

  try {
    let books = await readBooksFromFile(booksFilePath);
    books.push(newBook);
    await writeBooksToFile(booksFilePath, books);

    res.status(201).send('Book added successfully');
  } catch (err) {
    console.error('Error writing to file:', err);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
