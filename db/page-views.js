const dbManager = require('./db-manager')

const dbFile = `${__dirname}/page-views.db`
const table = 'pageViews'
const columns = ['page','views']

const setupDb = async () => {
    let db = await dbManager.initDb(dbFile)
    db.run(`CREATE TABLE IF NOT EXISTS ${table} (${columns[0]} TEXT PRIMARY KEY, ${columns[1]} INTEGER NOT NULL);`);
    db.close()
}

const getViews = async (page) => {
    let db = await dbManager.connect(dbFile)
    return new Promise((resolve, reject) => {
        db.all(`SELECT ${columns[1]} FROM ${table} WHERE ${columns[0]} = '${page}';`, (err, rows) => {
            
            if (err) { console.log(err.message); return reject(err)}
            resolve( rows[0] ? rows[0].hits : null)
        })
        db.close()
    })
}

// If the page does not exist, add it
const increment = async (page) => {
    let views = await getViews(page)
    console.log("views: " + views)
    if (views == null) return await addPage(page)
    let db = await dbManager.initDb(dbFile)
    return new Promise((resolve, reject) => {
        db.all(`UPDATE ${table} SET ${columns[1]}=${views+1} WHERE ${columns[0]} = '${page}'`, err => {
            if (err) return reject(err)
            resolve(views+1)
        })
        db.close()
    })
}

const addPage = async (page) => {
    const defaultViews = 1
    let db = await dbManager.initDb(dbFile)
    return new Promise((resolve, reject) => {
        db.all(`INSERT INTO ${table} VALUES ('${page}', ${defaultViews})`, err => {
            if (err) return reject(err)
            resolve(defaultViews)
        })
        db.close()
    })
}
 
module.exports = {
    setupDb,
    increment
}