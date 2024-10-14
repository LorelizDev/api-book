import bookModel from "../models/bookModel.js";

export const getAllBooks = async (req, res) => {
    try {
        const books = await bookModel.findAll()
        res.json(books)  
    } catch (error) {
        res.json(message, error.message)
    }
}

export const createBook = async (req, res) => {
    try {
        const { title, author, description } = req.body
        const newBook = await bookModel.create({
            title,
            author,
            description
        })
        res.status(201).json(newBook)
    } catch (error) {
        res.json(message, error.message)
    }
}

export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params
        const book = await bookModel.destroy({
            where: { id }
        })
        res.status(200).json({
            book: book,
            message:'Book deleted successfully'
        })
    } catch (error) {
        res.json(message, error.message)
    }
}