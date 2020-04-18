const db = require('./db')

const pageHitsFile = `${__dirname}/page-hits.db`
const table = 'hits'
const columns = ['page','hits']

const setupPageHits = async () => {
    try {
        let pageHitsDb = await db.initDb(pageHitsFile)
        pageHitsDb.run(`CREATE TABLE IF NOT EXISTS ${table} (${columns[0]} TEXT PRIMARY KEY, ${columns[1]} INTEGER NOT NULL);`);
        pageHitsDb.close()
        console.log("Setup page hits.")
    }
    catch(err) {
        console.error(err.message)
        console.log("Unable to setup page hits.")
    }
}

const getPageHits = async (page) => {
    try {
        let pageHitsDb = await db.initDb(pageHitsFile)
        pageHitsDb.all(`SELECT ${columns[1]} FROM ${table} WHERE ${columns[0]} = '${page}';`, (err, rows) => {
            console.log("Result: " + rows)
            return rows[0][0]
        })
        pageHitsDb.close()
    } catch (err) {
        console.error(err)
        return null
    }
}

const addPage = async (page) => {
    let pageHitsDb = await db.initDb(pageHitsFile)
    pageHitsDb.all(`INSERT INTO ${table} VALUES ('${page}', 0)`, (err, rows) => {})
    pageHitsDb.close()
}
 
module.exports = {
    setupPageHits,
    addPage,
    getPageHits
}

// import db.js

// configure table for a page

// fetch page numbers

// increment page numbers