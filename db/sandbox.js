let p1 = new Promise((resolve, reject) => {
    let err = new Error()
    err.n = 1
    reject(err)
})

p1
.catch( err => {
    return new Promise((resolve, reject) => {
        //reject(-1)
        resolve(err.n + 1)
    })
})
.then( n => console.log(n))
.catch( err => console.log(err))