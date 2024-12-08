const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const herbsRoute = require('./routes/herbs');
const searchRoute = require('./routes/search');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('Response backend success.');
    res.send('<img style="display: block; margin: auto;" src="https://storage.googleapis.com/c242-ps076-herbamate-bucket/img-logo/Logo%20HerbaMate.png"/>');
});

app.use('/herb', herbsRoute);
app.use('/herbs', searchRoute);

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});
