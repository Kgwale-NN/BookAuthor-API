import { Router, Request, Response } from "express";
import { body, param, validationResult } from "express-validator"
import { addAuthor, getAuthors, getAuthorById, updateAuthor, deleteAuthor } from '../controllers/author'

const routor = Router()

routor.get("/", (req: Request, res: Response) => {

    res.status(200).json(getAuthors())

})

routor.get("/:id", [param("id").isInt().withMessage("Id must be an interger")], (req: Request, res: Response) => {

    const errors = validationResult(req)

    console.log(errors, "erros from express-validator middleware")

    if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    const author = getAuthorById(parseInt(String(id), 10))

    if (!author) {

        return res.status(404).json({ message: "Author not found" })
    }

    res.status(200).json(author)
})

routor.post("/", [body("name").isString().withMessage("Name must be a string"), body("email").isEmail().withMessage("Email must be a valid email address")], (req: Request, res: Response) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() })
    }

    console.log(req)

    const { name, email } = req.body
    const newAuthor = addAuthor(name, email)

    res.status(201).json(newAuthor)
})

routor.put("/:id", [param("id").isInt().withMessage("Id must be an interger"), body("name").isString().withMessage("Name must be a string"), body("email").isEmail().withMessage("Email must be a valid email address")], (req: Request, res: Response) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    const { name, email } = req.body

    const updatedAuthor = updateAuthor(parseInt(String(id), 10), name, email)

    if (!updatedAuthor) {

        return res.status(404).json({ message: "Author not found" })
    }

    res.status(200).json(updatedAuthor)
})

routor.delete("/:id", [param("id").isInt().withMessage("Id must be an interger")], (req: Request, res: Response) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params

    const deleted = deleteAuthor(parseInt(String(id), 10))

    if (!deleted) {

        return res.status(404).json({ message: "Author not found" })
    }

    res.status(204).send()
})

export default routor
