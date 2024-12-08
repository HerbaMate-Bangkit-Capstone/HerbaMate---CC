const express = require('express');
const routerHerbs = express.Router();;
const database = require('../config/database');

const { body, validationResult } = require('express-validator')


//GET all data Herbs
routerHerbs.get('/', function (req, res) {
    database.query('SELECT id, name, latin_name, image_link FROM herbals', function (err, rows) {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: 'Internal Server Error',
            });
        }

        if (rows.length === 0) {
            return res.status(404).json({
                code: 404,
                message: 'No herbs found in the database',
            });
        }

        const herbs = rows.map(row => {
            return {
                id: row.id,
                name: row.name,
                latin_name: row.latin_name,
                image_link: row.image_link
            };
        });

        return res.status(200).json({
            code: 200,
            message: 'Success Get All Data Herbal',
            data: herbs,
        });
    });
});


//GET data Herb by ID
routerHerbs.get('/:id', function (req, res) {
    let id = req.params.id;

    database.query('SELECT * FROM herbals WHERE id = ?', [id], function (err, rows) {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: 'Internal Server Error',
            });
        }

        if (rows.length === 0) {
            return res.status(404).json({
                code: 404,
                message: 'Herb Not Found',
            });
        }

        const herb = {
            id: rows[0].id,
            name: rows[0].name,
            latin_name: rows[0].latin_name,
            local_name: JSON.parse(rows[0].local_name),
            image_link: rows[0].image_link,
            description: rows[0].description,
            disease: JSON.parse(rows[0].disease),
            composition: rows[0].composition,
        };

        return res.status(200).json({
            code: 200,
            message: 'Success Get Herb Details',
            data: herb,
        });
    });
});

//POST data Herbals
routerHerbs.post('/store', [
    body('name').notEmpty(),
    body('latin_name').notEmpty(),
    body('local_name').isArray(),
    body('image_link').notEmpty(),
    body('description').notEmpty(),
    body('disease').isArray(),
    body('composition').notEmpty()
], (req, res) => {

    // Mengecek jika ada error validasi
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            code: 422,
            message: 'Validation Error',
            errors: errors.array()
        });
    }

    let formData = {
        name: req.body.name,
        latin_name: req.body.latin_name,
        local_name: JSON.stringify(req.body.local_name),
        image_link: req.body.image_link,
        description: req.body.description,
        disease: JSON.stringify(req.body.disease),
        composition: req.body.composition
    };

    database.query('INSERT INTO herbals SET ?', formData, function (err, result) {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: 'Internal Server Error'
            });
        }

        const insertedId = result.insertId;

        return res.status(201).json({
            code: 201,
            message: 'Data added successfully',
            data: {
                id: insertedId,
                name: formData.name,
                latin_name: formData.latin_name,
                local_name: JSON.parse(formData.local_name),
                image_link: formData.image_link,
                description: formData.description,
                disease: JSON.parse(formData.disease),
                composition: formData.composition
            }
        });
    });
});

//DELETE data Herb by ID
routerHerbs.delete('/delete/:id', function (req, res) {

    let id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            code: 400,
            message: 'Invalid ID format.'
        });
    }

    database.query('DELETE FROM herbals WHERE id = ?', [id], function (err, result) {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: 'Internal Server Error'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                code: 404,
                message: 'Data Not Found'
            });
        }

        return res.status(200).json({
            code: 200,
            message: 'Delete Data Successfully'
        });
    });
});

module.exports = routerHerbs;