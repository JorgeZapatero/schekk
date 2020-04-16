const sqlite3 = require('sqlite3').verbose()


let connect = (filename, mode) => new Promise( (resolve, reject) => {
    let db = new sqlite3.Database((filename, mode, err) => { if (err) {
        reject(err.message)
    }})
    resolve("Db found")
})


let checkMissingDb = (err) => {
    if (err.code === 'SQLITE_CANTOPEN') return ("Initialized db")
    return null
}

connect('./db/page-hits.db', sqlite3.OPEN_READWRITE)
// .catch(checkMissingDb)
// .then(result => console.log(result))

// new Promise((resolve, reject) => {
//     console.log('Initial');

//     resolve(1);
// })
// .then((n) => {
//     throw new Error('Something failed');
//     console.log('Do this');
// })
// .catch(() => {
//     console.error('Do that');
//     return 2
// })
// .then((n) => {
//     console.log(n)
//     console.log('Do this, no matter what happened before');
// });

// connect('./db/page-hits.js', sqlite3.OPEN_READWRITE)
// .catch( err => {
//     if (err.code === 'SQLITE_CANTOPEN') {
//         // initializeDb
//     }
// })
// .then()




// let db = new sqlite3.Database('./db/page-hits.db', sqlite3.OPEN_READWRITE, (err) => {
//     if (err){
//         console.error(err.message)
//         if (err.code === 'SQLITE_CANTOPEN') {
//             console.log("Creating db for page-hits")
//             createDb()
//         }
//         return
//     }
//     console.log('Connected to the page-hits database.');
//   });

//   const setupFilesystemDb = () => {
//     let db = new sqlite3.Database('./db/page-hits.db');
//     // TODO: add a table for page hits
//   }
  
