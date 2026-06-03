const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


// GET ALL
const getAllBooks = async (req, res) => {
    //#swagger.tags=['books']
    try {
        const result = await mongodb.getDatabase().db().collection('books').find().toArray();
    
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET SINGLE
const getBookById = async (req, res) => {
    //#swagger.tags=['books']
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('books').find({_id: userId}).toArray();
        
        res.setHeader('Content-Type', 'application/json');

        if (!result) {
            return res.status(404).json({
                message: "Author not found"
            });
        }

        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST
const createBook = async (req, res) => {
    //#swagger.tags=['books']
    const books = {
        title: req.body.title,
        isbn: req.body.isbn,
        publicationYear: req.body,publicationYear,
        authorId: req.body.authorId
    };
    try {
        const response = await mongodb.getDatabase().db().collection('books').insertOne(books);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occured while creating the Author');
        }
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

// PUT
const updateBook = async (req, res) => {
    //#swagger.tags=['books']
    const userId = new ObjectId(req.params.id);
    const books = {
        title: req.body.title,
        isbn: req.body.isbn,
        publicationYear: req.body,publicationYear,
        authorId: req.body.authorId
    };
    try {
         const response = await mongodb.getDatabase().db().collection('books').replaceOne({_id: userId}, books);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occured while updating the author')
        }
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json(error.message || 'Some error occurred while updating the author');
    }
};

// DELETE
const deleteBook = async (req, res) => {
    //#swagger.tags=['books']
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('books').deleteOne({_id: userId});
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occured while deleting the author')
        }
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json(error.message || 'Some error occurred while deleting the author');
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};