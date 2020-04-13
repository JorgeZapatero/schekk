class Dictionary {
    constructor() { }
    insert(key, value) { this[key] = value }
    get(key)           { return this[key] }
    delete(key)        { this.delete(key)}
    
}

// let keys =   ['a', 'b', 'c', 'd', 'e']
// let values = [ 0 ,  1 ,  2 ,  3 ,  4 ]

// let dict = new Dictionary()
// dict.insert(keys[0], values[0])
// dict.insert(keys[1], values[1])

// console.log(dict.get(keys[0]))
// console.log(dict.get(keys[1]))

// for (const k in dict) {
//     console.log(dict[k])
// }