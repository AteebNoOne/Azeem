const express = require('express');
const router = express.Router();
const productService = require('./products.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

// route handlers
async function getAll(req, res, next) {
    try {
        const products = await productService.getAll();
        res.json(products);
    } catch (err) {
        next(err);
    }
}

async function getById(req, res, next) {
    try {
        const product = await productService.getById(req.params.id);
        res.json(product);
    } catch (err) {
        next(err);
    }
}

async function create(req, res, next) {
    try {
        const product = await productService.create(req.body);
        res.json(product);
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const product = await productService.update(req.params.id, req.body);
        res.json(product);
    } catch (err) {
        next(err);
    }
}

async function _delete(req, res, next) {
    try {
        await productService.delete(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        next(err);
    }
}
