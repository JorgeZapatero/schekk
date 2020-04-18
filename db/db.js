const sqlite3 = require('sqlite3').verbose()

const connect = (filename) => new Promise( (resolve, reject) => {
    let db = new sqlite3.Database(filename, sqlite3.OPEN_READWRITE, err => {
        if (err) reject(err)
        resolve(db)
    })
})

const initDb = (filename) => new Promise( (resolve, reject) => {
    let db = new sqlite3.Database(filename, err => {
        if (err) reject(err)
        resolve(db)
    })
})

const disconnect = (db) => {
    db.close()
    console.log("Closed")
}

module.exports = {
    connect,
    initDb,
    disconnect
}

// connect('tark')
// .then(disconnect)
// .catch(err => console.log(err.message))