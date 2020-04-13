class GameCell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Game {
    constructor(width, height, cellSize) {
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.snake = new Snake();
        GameCell.prototype.draw = function () {
            rect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);
        };
    }
}

let game = new Game(20, 20, 20);

function setup() {
    createCanvas(400, 400);
    background(10);
}

function draw() {
    rect(100,100,20,20)
}

function Snake() {
    this.body = []
    this.getHead = function() {
        if (body.length < 1) return null
        return body[0]
    };
    this.getTail = function() {
        if (body.length < 1) return null
        return body[body.length - 1]
    };
}









// // snake space
// function Cell(x, y) {
//     this.x = x;
//     this.y = y;
// }

// Cell.prototype.draw = (rez) => {
//     rect(this.x*rez, this.y*rez, rez, rez)
// }

// // screen space
// function ScreenCoord(x, y) {
//     this.x = x;
//     this.y = y;
// }

// let snake = function() {
//     this.body = [];
//     this.getHead = function() {
//         if (body.length < 1) return null
//         return body[0]
//     };
//     this.getTail = function() {
//         if (body.length < 1) return null
//         return body[body.length - 1]
//     };

//     this.crawl = function(direction) {
//         let x = head.x
//         let y = head.y
//         switch(direction) {
//             case 0:
//                 y = y - 1;
//                 break;
//             case 1:
//                 x = x + 1;
//                 break;
//             case 2:
//                 y = y + 1;
//                 break;
//             case 3:
//                 x = x - 1;
//         }
//         body.unshift({x: x, y: y})
//         body.pop()
//     };
// };

// // function drawCell(position, rez) {
// //     let center = position.getCenterCoord(rez)
// //     rect(center.x, center.y, rez, rez)
// // }

