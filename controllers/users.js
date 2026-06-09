const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


// GET ALL
const getAllUsers = async (req, res) => {
    //#swagger.tags=['users']
    try {
        const result = await mongodb.getDatabase().db().collection('users').find().toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET SINGLE
const getUserById = async (req, res) => {
    //#swagger.tags=['users']
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId }).toArray();

        res.setHeader('Content-Type', 'application/json');

        if (!result || result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST
const createUser = async (req, res) => {
    //#swagger.tags=['users']
    const users = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
        role: req.body.role,
        isActive: req.body.isActive,
        createdAt: req.body.createdAt
    };

    try {
        const response = await mongodb.getDatabase().db().collection('users').insertOne(users);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the user');
        }
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

// PUT
const updateUser = async (req, res) => {
    //#swagger.tags=['users']
    const userId = new ObjectId(req.params.id);
    const users = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
        role: req.body.role,
        isActive: req.body.isActive,
        createdAt: req.body.createdAt
    };

    try {
        const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, users);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the user');
        }
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json(error.message || 'Some error occurred while updating the user');
    }
};

// DELETE
const deleteUser = async (req, res) => {
    //#swagger.tags=['users']
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the user');
        }
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json(error.message || 'Some error occurred while deleting the user');
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
