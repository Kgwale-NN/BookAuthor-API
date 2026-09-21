import { Router,Request,Response } from "express";
import {body,param,validationResult} from "express-validator"

const routor = Router()

let authors = [

    {id:1 ,name:"Professor Snape" , email: "Snape@hogwarts.com"},
    {id:2,name:"Professor Dumbledore" , email: "albus@hogwarts.com"}

]

routor.get("/" , (req:Request,res:Response) => {

    res.status(200).json(authors)

})

routor.get("/id" ,[param("id").isInt().withMessage("Id must be an interger")] ,(req:Request,res:Response) =>{

    const errors = validationResult(req)

    console.log(errors,"erros from express-validator middleware")

    if(!errors.isEmpty()){

        return res.status(400).json({errors: errors.array()})
    }

    const {id} = req.params
    const author = authors.find((author) => author.id === parseInt(String(id), 10))

    if(!author){

        return res.status(400).send("User not found")
    }

    res.status(200).json(author)
})
