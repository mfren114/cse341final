const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


// GET ALL
const getAllLibraries = async (req, res) => {
    //#swagger.tags=['libraries']
    try {
        const result = await mongodb.getDatabase().db().collection('libraries').find().toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET SINGLE
const getLibraryById = async (req, res) => {
    //#swagger.tags=['libraries']
    try {
        const libraryId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('libraries').find({ _id: libraryId }).toArray();

        res.setHeader('Content-Type', 'application/json');

        if (!result || result.length === 0) {
            return res.status(404).json({
                message: "Library not found"
            });
        }

        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST
const createLibrary = async (req, res) => {
    //#swagger.tags=['libraries']
    const libraries = {
        name: req.body.name,
        location: req.body.location,
        booksAvailable: req.body.booksAvailable,
        isOpen: req.body.isOpen
    };

    try {
        const response = await mongodb.getDatabase().db().collection('libraries').insertOne(libraries);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the library');
        }
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

// PUT
const updateLibrary = async (req, res) => {
    //#swagger.tags=['libraries']
    const libraryId = new ObjectId(req.params.id);
    const libraries = {
        name: req.body.name,
        location: req.body.location,
        booksAvailable: req.body.booksAvailable,
        isOpen: req.body.isOpen
    };

    try {
        const response = await mongodb.getDatabase().db().collection('libraries').replaceOne({ _id: libraryId }, libraries);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the library');
        }
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json(error.message || 'Some error occurred while updating the library');
    }
};

// DELETE
const deleteLibrary = async (req, res) => {
    //#swagger.tags=['libraries']
    try {
        const libraryId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('libraries').deleteOne({ _id: libraryId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the library');
        }
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json(error.message || 'Some error occurred while deleting the library');
    }
};

module.exports = {
    getAllLibraries,
    getLibraryById,
    createLibrary,
    updateLibrary,
    deleteLibrary
};
