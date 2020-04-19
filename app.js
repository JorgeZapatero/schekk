require('dotenv').config();
const pageHits = require('./db/page-hits');
const express = require('express');

const schnekkPage = 'schnekk';

(async () => {
    try {
        await pageHits.setupPageHitsDb()
        let schnekkHits = await pageHits.incrementPageHits(schnekkPage)
        console.log(schnekkHits)
    } catch (err) {
        console.error(err.message)
    }
})()

// const hostname = process.env.HOST ? process.env.HOST : "127.0.0.1"
// const port     = process.env.PORT ? process.env.PORT : "3000"
// const rootUrl  = `http://${hostname}:${port}/`

// const app = express()
// app.set('view engine', 'ejs'); 

// app.get('/', (req, res) => res.send('Yeet !!') )
// app.get('/schnekk', (req, res) => {
//     res.render('schnekk', {rootUrl: rootUrl}); 
// })

// app.use('/public', express.static('public'));

// app.listen(port, () => console.log(`App running at ${rootUrl}`) )
