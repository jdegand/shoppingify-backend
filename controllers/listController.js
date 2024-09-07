const mongoose = require('mongoose');
const List = require('../models/List');
const jwt = require('jsonwebtoken');

const getLists = async (req, res) => {

    const accessToken = req.headers.authorization.split(' ')[1];

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {

            try {
                const list = await List.find({}).populate('user').sort({ updatedAt: -1 }) //.select('-items')
                if (!list) return res.status(204).json({ 'message': "No Lists found" });

                const userLists = list.filter(el => el.user.id === decoded.UserInfo._id)

                res.json(userLists);
            } catch (err) {
                console.log(err)
            }
        })
}

const createList = async (req, res) => {

    const accessToken = req.headers.authorization.split(' ')[1];

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {

            const { listName, state, items } = req.body;
            //if (!listName) return res.status(400).json({ 'message': 'Missing name for List' });

            const duplicate = await List.findOne({ listName: listName }).exec()

            if (duplicate) return res.status(409).json({ message: "List name taken" })

            try {

                List.create({
                    "listName": listName,
                    "state": state,
                    "user": decoded.UserInfo._id,
                    "items": items,
                });

                res.status(201).json({ 'success': `New List added!` });
            } catch (err) {
                res.status(500).json({ 'message': err.message });
            }

        }
    );
}

const getListById = async (req, res) => {

    const accessToken = req.headers.authorization.split(' ')[1];

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {

            try {
                if (!req?.params?.id) return res.status(400).json({ "message": 'List ID required' });

                const list = await List.findOne({ _id: req.params.id }).exec();
                if (!list) {
                    return res.status(204).json({ 'message': `List ID ${req.params.id} not found` });
                }
                res.json(list);
            } catch (err) {
                res.status(500).json({ 'message': err.message });
            }
        })
}

const getListByListId = async (req, res) => {

    const accessToken = req.headers.authorization.split(' ')[1];

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {

            try {
                if (!req?.params?.id) return res.status(400).json({ "message": 'List ID required' });

                const list = await List.findOne({ _id: req.params.id }).exec();
                if (!list) {
                    return res.status(204).json({ 'message': `List ID ${req.params.id} not found` });
                }
                res.json(list);
            } catch (err) {
                res.status(500).json({ 'message': err.message });
            }
        })
}

const updateList = async (req, res) => {

    const accessToken = req.headers.authorization.split(' ')[1];

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {

            const { itemIds } = req.body;

            const listExists = await List.findOne({ listName: listName }).exec()

            if (!listExists) return res.status(409).json({ message: "List not found" })

            try {
                if (!req?.params?.id) return res.status(400).json({ "message": 'List ID required' });

                const list = await List.findOne({ _id: req.params.id }).exec();
                if (!list) {
                    return res.status(204).json({ 'message': `List ID ${req.params.id} not found` });
                }

                list.items = [] // reset and then update

                list.items.push(itemIds)

                await list.save()

                res.json(list);
            } catch (err) {
                res.status(500).json({ 'message': err.message });
            }
        }
    );
}

// add delete functionality ?

module.exports = {
    getLists,
    getListById,
    getListByListId,
    createList,
    updateList,
}