import { Router, Request, Response } from "express";
import { body, param, validationResult } from "express-validator"
import { addBook, getBooks, getBookById, updateBook, deleteBook } from '../controllers/book'

const bookRouter = Router()

bookRouter.get("/", (req: Request, res: Response) => {
    res.status(200).json(getBooks())
})

bookRouter.get("/:id", [param("id").isInt().withMessage("Id must be an integer")], (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    const book = getBookById(parseInt(String(id), 10))

    if (!book) {
        return res.status(404).json({ message: "Book not found" })
    }

    res.status(200).json(book)
})

bookRouter.post("/", [
    body("title").isString().withMessage("Title must be a string").notEmpty().withMessage("Title cannot be empty"),
    body("authorId").isInt().withMessage("Author ID must be an integer").toInt(),
    body("publishedYear").isInt().withMessage("Published year must be an integer").toInt()
], (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { title, authorId, publishedYear } = req.body
    const newBook = addBook(title, authorId, publishedYear)

    if (!newBook) {
        return res.status(404).json({ message: "Author not found" })
    }

    res.status(201).json(newBook)
})

bookRouter.put("/:id", [
    param("id").isInt().withMessage("Id must be an integer"),
    body("title").isString().withMessage("Title must be a string").notEmpty().withMessage("Title cannot be empty"),
    body("authorId").isInt().withMessage("Author ID must be an integer").toInt(),
    body("publishedYear").isInt().withMessage("Published year must be an integer").toInt()
], (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    const { title, authorId, publishedYear } = req.body
    const updatedBook = updateBook(parseInt(String(id), 10), title, authorId, publishedYear)

    if (!updatedBook) {
        return res.status(404).json({ message: "Book or author not found" })
    }

    res.status(200).json(updatedBook)
})

bookRouter.delete("/:id", [param("id").isInt().withMessage("Id must be an integer")], (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    const deleted = deleteBook(parseInt(String(id), 10))

    if (!deleted) {
        return res.status(404).json({ message: "Book not found" })
    }

    res.status(204).send()
})

export default bookRouter