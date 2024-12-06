const express = require('express');
const router = express.Router();

const connection = require('../config/database');

//GET all data Herbals
router.get('/', function (req, res) {
    connection.query('SELECT * FROM herbals ORDER BY id desc', function (err, rows) {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: 'Internal server Error',
            });
        }

        if (rows.length === 0) {
            return res.status(404).json({
                code: 404,
                message: 'Data not found',
            });
        }

        const herbalsData = {
            id: rows[0].id,
            name: rows[0].name,
            latin_name: rows[0].latin_name,
            description: rows[0].description,
        };

        return res.status(200).json({
            code: 200,
            message: 'Success Get Herbals',
            data: herbalsData,
        });
    });
});

//GET data Herbals by ID
router.get('/:id', function (req, res) {
    let id = req.params.id;

    connection.query('SELECT * FROM herbals WHERE id = ?', [id], function (err, rows) {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: 'Internal Server Error',
            });
        }

        if (rows.length <= 0) {
            return res.status(404).json({
                code: 404,
                message: 'Data Herb Not Found!',
            });
        }

        const herb = {
            id: rows[0].id,
            name: rows[0].name,
            latin_name: rows[0].latin_name,
            local_name: rows[0].local_name.split(','),
            image_link: rows[0].image_link,
            description: rows[0].description,
            disease: rows[0].disease.split(','),
            composition: rows[0].composition,
        };

        return res.status(200).json({
            code: 200,
            message: 'Success Get Detail Herbal',
            data: herb,
        });
    });
});

module.exports = router;