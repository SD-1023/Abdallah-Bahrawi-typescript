import { Book } from "../services/books";
import * as fs from 'fs';


export interface IBookRepository {
    readBooks(filePath: string): Promise<Book[]>;
}

export function getBooksRepo(): IBookRepository {
    return new FileSystemBookRepo();
}

export class FileSystemBookRepo implements IBookRepository {

    readBooks(filePath: string): Promise<Book[]> {
        return new Promise((resolve, reject) => {
          fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
              reject(err);
              return;
            }

            const books: Book[] = JSON.parse(data);
            resolve(books);
          });
        });
    }
}