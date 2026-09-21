 import { Author } from '../models/author'

let authors: Author[] = [
    { id: 1, name: "Professor Snape", email: "Snape@hogwarts.com" },
    { id: 2, name: "Professor Dumbledore", email: "albus@hogwarts.com" }
]

let currentId = 3

export const addAuthor = (name: string, email: string): Author => {
    const newAuthor = { id: currentId++, name, email }
    authors.push(newAuthor)
    return newAuthor
}

export const getAuthors = (): Author[] => {
    return authors
}

export const getAuthorById = (id: number): Author | undefined => {
    const author = authors.find((author) => author.id === id)
    if (!author) {
        return undefined
    }
    return author
}

export const updateAuthor = (id: number, name: string, email: string): Author | undefined => {
    const author = authors.find((author) => author.id === id)
    if (!author) {
        return undefined
    }
    author.name = name
    author.email = email
    return author
}

export const deleteAuthor = (id: number): boolean => {
    const authorIndex = authors.findIndex((author) => author.id === id)
    if (authorIndex === -1) {
        return false
    }
    authors.splice(authorIndex, 1)
    return true
}