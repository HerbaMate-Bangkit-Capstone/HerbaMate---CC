const express = require('express');
const routerSearch = express.Router();;
const database = require('../config/database');

//GET to search data Herbs
routerSearch.get('/search', (req, res) => {
    const searchQuery = req.query.q;

    if (!searchQuery) {
        return res.status(400).send('Query parameter "q" is required');
    }

    const sql = 'SELECT id, name, latin_name, image_link, description FROM herbals WHERE name LIKE ?';

    database.query(sql, [`%${searchQuery}%`], (err, results) => {
        if (err) {
            console.error('Error executing query: ', err.stack);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length === 0) {
            return res.status(404).json({
                code: 404,
                message: 'No herbs found matching the search query',
            });
        }

        const herbs = results.map(row => {
            return {
                id: row.id,
                name: row.name,
                latin_name: row.latin_name,
                image_link: row.image_link,
                description: row.description,
            };
        });

        return res.status(200).json({
            code: 200,
            message: 'Herbs found successfully',
            data: herbs,
        });
    });
});

module.exports = routerSearch;