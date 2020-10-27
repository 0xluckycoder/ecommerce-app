const express = require('express');
const router = express.Router();

// item modal
const Item = require('../../models/Item');

// get all
router.get('/', async (req, res, next) => {
    try {
        const data = await Item.find({});
        res.json(data);
    } catch (error) {
        next(error);
    }
});

// get one
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const receivedItem = await Item.findById(id);
        res.json(receivedItem);
    } catch (error) {
        // console.log('logging error ❌', error);
        res.status(404).json({
            success: false
        });
        // next(error);
    }
});

// create
router.post('/', async (req, res, next) => {
    try {
        const newItem = new Item(req.body);
        const createdItem = await newItem.save();
        res.json(createdItem);
    } catch(error) {
        console.log('error', error);
        next(error);
    }
});

// update
router.put('/:id', (req, res, next) => {
    res.json({
        message: 'hello update'
    });
});

// delete
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const getItem = await Item.findById(id);
        const deletedItem = await getItem.remove();
        res.json(deletedItem);
    } catch (error) {
        next(error);
    }
});

module.exports = router;