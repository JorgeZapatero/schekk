const express = require('express')

const app = express()
const hostname = "127.0.0.1"
const port = 3000

app.get('/', (req, res) => res.send('Yeet !!') )
app.get('/schnekk', (req, res) => {
    res.sendFile('./public/snake.html', { root: __dirname } )
})

app.use('/public', express.static('public'));

app.listen(port, () => console.log(`App running at http://${hostname}:${port}/`) )