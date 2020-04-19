const db = require('./db-manager')

const pageHitsFile = `${__dirname}/page-hits.db`
const table = 'hits'
const columns = ['page','hits']

const setupPageHitsDb = async () => {
    try {
        let pageHitsDb = await db.initDb(pageHitsFile)
        pageHitsDb.run(`CREATE TABLE IF NOT EXISTS ${table} (${columns[0]} TEXT PRIMARY KEY, ${columns[1]} INTEGER NOT NULL);`);
        pageHitsDb.close()
    }
    catch(err) {
        console.error(err.message)
        console.log("Unable to setup page hits.")
    }
}

const getPageHits = async (page) => {
    try {
        let pageHitsDb = await db.initDb(pageHitsFile)
        return new Promise((resolve, reject) => {
            pageHitsDb.all(`SELECT ${columns[1]} FROM ${table} WHERE ${columns[0]} = '${page}';`, (err, rows) => {
                if (err) return reject(err)
                resolve( rows[0] ? rows[0].hits : null)
            })
            pageHitsDb.close()
        })
    } catch (err) {
        console.error(err)
        return null
    }
}


// If the page does not exist, add it
const incrementPageHits = async (page) => {
    try {
        let pageHits = await getPageHits(page)
        if (pageHits == null) return await addPage(page)

        let pageHitsDb = await db.initDb(pageHitsFile)
        return new Promise((resolve, reject) => {
            pageHitsDb.all(`UPDATE ${table} SET ${columns[1]}=${pageHits+1} WHERE ${columns[0]} = '${page}'`, err => {
                if (err) return reject(err)
                resolve(pageHits+1)
            })
            pageHitsDb.close()
        })
    } catch (error) {
        console.error(err)
        return null
    }
}

const addPage = async (page) => {
    const defaultHitCount = 1
    let pageHitsDb = await db.initDb(pageHitsFile)
    return new Promise((resolve, reject) => {
        pageHitsDb.all(`INSERT INTO ${table} VALUES ('${page}', 1)`, err => {
            if (err) return reject(err)
            resolve(defaultHitCount)
        })
        pageHitsDb.close()
    })
}
 
module.exports = {
    setupPageHitsDb,
    addPage,
    getPageHits,
    incrementPageHits
}

// import db.js

// configure table for a page

// fetch page numbers

// increment page numbers