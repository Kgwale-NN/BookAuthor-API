import { Book } from '../models/book'
import { getAuthorById } from './author'
import { AppError } from '../middleware/errorHandler'

let books: Book[] = []
let currentId = 1

export const addBook = (title: string, authorId: number, publishedYear: number): Book => {
    const author = getAuthorById(authorId)
    if (!author) {
        throw new AppError('Author not found', 404)
    }

    const existingBook = books.find((book) => book.title === title && book.authorId === authorId)
    if (existingBook) {
        throw new AppError('Book with this title already exists for this author', 409)
    }

    const newBook = { id: currentId++, title, authorId, publishedYear }
    books.push(newBook)
    return newBook
}

export const getBooks = (): Book[] => {
    return books
}

export const getBookById = (id: number): Book | undefined => {
    const book = books.find((book) => book.id === id)
    if (!book) {
        return undefined
    }
    return book
}

export const updateBook = (id: number, title: string, authorId: number, publishedYear: number): Book => {
    const author = getAuthorById(authorId)
    if (!author) {
        throw new AppError('Author not found', 404)
    }

    const book = books.find((book) => book.id === id)
    if (!book) {
        throw new AppError('Book not found', 404)
    }

    const existingBook = books.find((book) => book.title === title && book.authorId === authorId && book.id !== id)
    if (existingBook) {
        throw new AppError('Book with this title already exists for this author', 409)
    }

    book.title = title
    book.authorId = authorId
    book.publishedYear = publishedYear
    return book
}

export const deleteBook = (id: number): boolean => {
    const bookIndex = books.findIndex((book) => book.id === id)
    if (bookIndex === -1) {
        return false
    }
    books.splice(bookIndex, 1)
    return true
}

export const getBooksByAuthor = (authorId: number): Book[] => {
    const author = getAuthorById(authorId)
    if (!author) {
        throw new AppError('Author not found', 404)
    }

    return books.filter((book) => book.authorId === authorId)
}