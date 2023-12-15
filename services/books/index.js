"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.writeBooksToFile = exports.readBooksFromFile = void 0;
const fs = __importStar(require("fs"));
const booksRepo_1 = require("../../repo/booksRepo");
const readBooksFromFile = (filePath) => {
    const songs = (0, booksRepo_1.getBooksRepo)().readBooks(filePath);
    return songs;
};
exports.readBooksFromFile = readBooksFromFile;
const writeBooksToFile = (filePath, books) => {
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
exports.writeBooksToFile = writeBooksToFile;
let books;
const search = (query) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (books === undefined) {
                books = yield (0, exports.readBooksFromFile)("./books/books.json");
            }
            if (!books) {
                reject("Error reading books");
                return;
            }
            const filteredBooks = books.filter((book) => book.name.toLowerCase().includes(query.toString().toLowerCase()));
            resolve(filteredBooks);
        }
        catch (err) {
            reject(err);
        }
    }));
};
exports.search = search;
