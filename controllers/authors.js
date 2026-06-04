const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


// GET ALL
const getAllAuthors = async (req, res) => {
    //#swagger.tags=['authors']
    try {
        const result = await mongodb.getDatabase().db().collection('authors').find().toArray();
    
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET SINGLE
const getAuthorById = async (req, res) => {
    //#swagger.tags=['authors']
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('authors').find({_id: userId}).toArray();
        
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
const createAuthor = async (req, res) => {
    //#swagger.tags=['authors']
    const authors = {
        name: req.body.name,
        biography: req.body.biography,
        nationality: req.body.nationality
    };
    try {
        const response = await mongodb.getDatabase().db().collection('authors').insertOne(authors);
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
const updateAuthor = async (req, res) => {
    //#swagger.tags=['authors']
    const userId = new ObjectId(req.params.id);
    const authors = {
        name: req.body.name,
        biography: req.body.biography,
        nationality: req.body.nationality
    };
    try {
         const response = await mongodb.getDatabase().db().collection('authors').replaceOne({_id: userId}, authors);
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
const deleteAuthor = async (req, res) => {
    //#swagger.tags=['authors']
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('authors').deleteOne({_id: userId});
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
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};