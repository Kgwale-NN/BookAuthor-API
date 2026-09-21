import { Router, Request, Response } from "express";
import { body, param, validationResult } from "express-validator"

const routor = Router()

let authors = [

    { id: 1, name: "Professor Snape", email: "Snape@hogwarts.com" },
    { id: 2, name: "Professor Dumbledore", email: "albus@hogwarts.com" }

]

routor.get("/", (req: Request, res: Response) => {

    res.status(200).json(authors)

})

routor.get("/:id", [param("id").isInt().withMessage("Id must be an interger")], (req: Request, res: Response) => {

    const errors = validationResult(req)

    console.log(errors, "erros from express-validator middleware")

    if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    const author = authors.find((author) => author.id === parseInt(String(id), 10))

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
    const newAuthor = { id: authors.length + 1, name, email }
    authors.push(newAuthor)

    res.status(201).json(newAuthor)
})

routor.put("/:id", [param("id").isInt().withMessage("Id must be an interger"), body("name").isString().withMessage("Name must be a string"), body("email").isEmail().withMessage("Email must be a valid email address")], (req: Request, res: Response) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    const { name, email } = req.body

    const authorIndex = authors.findIndex((author) => author.id === parseInt(String(id), 10))

    if (authorIndex === -1) {

        return res.status(404).json({ message: "Author not found" })
    }

    authors[authorIndex] = { id: parseInt(String(id), 10), name, email }

    res.status(200).json(authors[authorIndex])
})

routor.delete("/:id", [param("id").isInt().withMessage("Id must be an interger")], (req: Request, res: Response) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params

    const authorIndex = authors.findIndex((author) => author.id === parseInt(String(id), 10))

    if (authorIndex === -1) {

        return res.status(404).json({ message: "Author not found" })
    }

    authors.splice(authorIndex, 1)

    res.status(204).send()
})

export default routor
