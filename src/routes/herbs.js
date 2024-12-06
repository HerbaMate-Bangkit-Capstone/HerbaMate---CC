const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/database');

//GET all data Herbals
router.get('/', function (req, res) {
    connection.query('SELECT id, name, latin_name, image_link FROM herbals', function (err, rows) {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: 'Internal Server Error.',
            });
        }

        if (rows.length === 0) {
            return res.status(404).json({
                code: 404,
                message: 'Data Herb Not Found!',
            });
        }

        return res.status(200).json({
            code: 200,
            message: 'Success Get All Data Herbal.',
            data: rows,
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
                message: 'Internal Server Error.',
            });
        }

        if (rows.length <= 0) {
            return res.status(404).json({
                code: 404,
                message: 'Data Herb Not Found!',
            });
        }

        // Mengambil data dari hasil query dan parsing JSON jika perlu
        const herb = {
            id: rows[0].id,
            name: rows[0].name,
            latin_name: rows[0].latin_name,
            local_name: JSON.parse(rows[0].local_name), // Mengonversi string JSON kembali ke array
            image_link: rows[0].image_link,
            description: rows[0].description,
            disease: JSON.parse(rows[0].disease), // Mengonversi string JSON kembali ke array
            composition: rows[0].composition,
        };

        return res.status(200).json({
            code: 200,
            message: 'Success Get Detail Herbal.',
            data: herb,
        });
    });
});

//POST data Herbals
router.post('/store', [
    body('name').notEmpty(), // Validasi name wajib diisi
    body('latin_name').notEmpty(), // Validasi latin_name wajib diisi
    body('local_name').isArray(), // Validasi local_name harus array
    body('image_link').notEmpty(), // Validasi image_link wajib diisi
    body('description').notEmpty(), // Validasi description wajib diisi
    body('disease').isArray(), // Validasi disease harus array
    body('composition').notEmpty() // Validasi composition wajib diisi
], (req, res) => {

    // Mengecek jika ada error validasi
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            code: 422,
            message: 'Validation Error',
            errors: errors.array() // Menampilkan error validasi jika ada
        });
    }

    // Jika tidak ada error validasi, lanjutkan dengan menyimpan data
    let formData = {
        name: req.body.name,
        latin_name: req.body.latin_name,
        local_name: JSON.stringify(req.body.local_name),  // Menyimpan data sebagai string JSON yang valid
        image_link: req.body.image_link,
        description: req.body.description,
        disease: JSON.stringify(req.body.disease),  // Menyimpan data sebagai string JSON yang valid
        composition: req.body.composition
    };

    connection.query('INSERT INTO herbals SET ?', formData, function (err, result) {
        if (err) {
            return res.status(500).json({
                code: 500,
                message: 'Internal Server Error'
            });
        }

        // Mendapatkan ID yang dihasilkan otomatis oleh MySQL
        const insertedId = result.insertId;

        return res.status(201).json({
            code: 201,
            message: 'Data added successfully',
            data: {
                id: insertedId,
                name: formData.name,
                latin_name: formData.latin_name,
                local_name: JSON.parse(formData.local_name), // Mengonversi string JSON kembali menjadi array
                image_link: formData.image_link,
                description: formData.description,
                disease: JSON.parse(formData.disease), // Mengonversi string JSON kembali menjadi array
                composition: formData.composition
            }
        });
    });
});

module.exports = router;