const sqlite3 = require('sqlite3').verbose()

const connect = (filename) => new Promise( (resolve, reject) => {
    let db = new sqlite3.Database(filename, sqlite3.OPEN_READWRITE, err => {
        if (err) {
            err.filename = filename
            reject(err)
        }
        resolve(db)
    })
})

const initDb = (filename) => new Promise( (resolve, reject) => {
    let db = new sqlite3.Database(filename, [sqlite3.OPEN_CREATE, sqlite3.OPEN_READWRITE], err =>{
        if (err) {
            
        }
    })
})

// const initDb = filename => {
//     console.log(`Creating database: ${filename}`)
//     return new sqlite3.Database(filename, [sqlite3.OPEN_CREATE, sqlite3.OPEN_READWRITE])
// }

const disconnect = (db) => {
    db.close()
    console.log("Closed")
}

const catchMissingDb = (err) => {
    if (err.code === 'SQLITE_CANTOPENa') {
        console.log("Caught")
        return initDb(err.filename)
    }
    else {
        console.log(err.message)
    }
}

connect('fark')
.catch(rejection)
.then(disconnect)
.catch(err => console.log(err.message))