require('dotenv').config();
const pageViews = require('./db/page-views');
const express = require('express');

const hostname = process.env.HOST ? process.env.HOST : "127.0.0.1"
const port     = process.env.PORT ? process.env.PORT : "3000"
const rootUrl  = `http://${hostname}:${port}/`

const schnekkPage = 'schnekk';

const app = express()
app.set('view engine', 'ejs'); 
app.get('/', (req, res) => res.send('Yeet !!') )
app.get('/schnekk', async (req, res) => {
    let schnekkViews = await pageViews.increment(schnekkPage)
    res.render('schnekk', {rootUrl: rootUrl, views: schnekkViews}); 
})
app.use('/public', express.static('public'));

(async () => {
    try {
        await pageViews.setupDb()
        app.listen(port, () => console.log(`App running at ${rootUrl}`) )
    }
    catch (err) {
        console.error(err.message)
    }
})()
