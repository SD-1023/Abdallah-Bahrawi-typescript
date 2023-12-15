"use strict";
// routes.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_1 = require("../services/books");
const router = express_1.default.Router();
const booksFilePath = './books/books.json';
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield (0, books_1.readBooksFromFile)(booksFilePath);
        res.render('books', { books });
    }
    catch (err) {
        console.error('Error reading file:', err);
        res.status(500).send('Internal Server Error');
    }
}));
router.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.q;
    if (!query) {
        return res.status(400).send('Missing query parameter');
    }
    try {
        const filteredBooks = yield (0, books_1.search)(query.toString());
        return res.json(filteredBooks);
    }
    catch (err) {
        console.error('Error during search:', err);
        return res.status(500).send('Internal Server Error');
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    if (isNaN(bookId)) {
        res.status(400).send('Invalid ID');
        return;
    }
    try {
        const books = yield (0, books_1.readBooksFromFile)(booksFilePath);
        const book = books.find((i) => i.id == bookId);
        if (!book) {
            res.status(404).send('Book not found');
            return;
        }
        res.render('bookDetails', { book });
    }
    catch (err) {
        console.error('Error reading file:', err);
        res.status(500).send('Internal Server Error');
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = req.body;
    try {
        let books = yield (0, books_1.readBooksFromFile)(booksFilePath);
        books.push(newBook);
        yield (0, books_1.writeBooksToFile)(booksFilePath, books);
        res.status(201).send('Book added successfully');
    }
    catch (err) {
        console.error('Error writing to file:', err);
        res.status(500).send('Internal Server Error');
    }
}));
// router.get('/search', async (req, res) => {
//     const query = req.query.q;
//     if (!query) {
//       return res.status(400).send('Missing query parameter');
//     }  
//     const songs = await songsService.search(query as string);
//     return res.json(songs)
// })
exports.default = router;
