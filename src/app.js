const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    console.log('Response backend success.')
    res.send('<img style="display: block; margin: auto;" src="https://storage.googleapis.com/c242-ps076-herbamate-bucket/img-logo/Logo%20HerbaMate.png"/>')
})

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const herbsRoute = require('./routes/herbs');
app.use('/herb', herbsRoute);

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`)
})