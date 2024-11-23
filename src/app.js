const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    console.log('Response success')
    res.send('<img style="display: block; margin: auto;" src="https://cdn.epicstream.com/images/ncavvykf/epicstream/a54b9c16f0f9e2de831b32febc169e734e4ded3d-1920x1080.png?rect=0,36,1920,1008&w=1200&h=630&auto=format"/>')
})

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const postsRouter = require('./routes/posts');
app.use('/api/posts', postsRouter);

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`)
})