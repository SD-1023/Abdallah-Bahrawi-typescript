import * as fs from 'fs';
import { getBooksRepo } from "../../repo/booksRepo";


export interface Book {
  id: number;
  name: string;
  author: string;
  isbn: string;
}

export const  readBooksFromFile = async (filePath: string): Promise<Book[]> => {
  const songs = await getBooksRepo().readBooks(filePath);
  return songs;
};

export const writeBooksToFile = (filePath: string, books: Book[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(books, null, 2), 'utf8', (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
};

let books: Book[];


export const search = (query: string): Promise<Book[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        if (books === undefined) {
            books = await readBooksFromFile("./books/books.json");
        }

        if (!books) {
          reject("Error reading books");
          return;
        }
  
        const filteredBooks = books.filter((book) =>
          book.name.toLowerCase().includes(query.toString().toLowerCase())
        );
  
        resolve(filteredBooks);
      } catch (err) {
        reject(err);
      }
    });
};
  