const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    console.log('Response success')
    res.send('Response API success!')
})

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const herbalsRoute = require('./routes/herbals');
app.use('/herbal', herbalsRoute);

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`)
})