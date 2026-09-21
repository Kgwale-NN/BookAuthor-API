import { Book } from '../models/book'
import { getAuthorById } from './author'

let books: Book[] = []
let currentId = 1

export const addBook = (title: string, authorId: number, publishedYear: number): Book | null => {
    const author = getAuthorById(authorId)
    if (!author) {
        return null
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

export const updateBook = (id: number, title: string, authorId: number, publishedYear: number): Book | null => {
    const author = getAuthorById(authorId)
    if (!author) {
        return null
    }

    const book = books.find((book) => book.id === id)
    if (!book) {
        return null
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