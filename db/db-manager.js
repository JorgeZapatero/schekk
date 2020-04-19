const sqlite3 = require('sqlite3').verbose()


// db must already exist
const connect = (filename) => new Promise( (resolve, reject) => {
    let db = new sqlite3.Database(filename, sqlite3.OPEN_READWRITE, err => {
        if (err) reject(err)
        resolve(db)
    })
})

// creates a db incase it does not exist
const initDb = (filename) => new Promise( (resolve, reject) => {
    let db = new sqlite3.Database(filename, err => {
        if (err) reject(err)
        resolve(db)
    })
})

module.exports = {
    connect,
    initDb
}