//TODO: how can apple appear behind the head?

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static setCellPrototypeFuncsFor(cellSize) {
        Cell.prototype.size = cellSize
        Cell.prototype.getAnchorX = function() { return this.x * cellSize }
        Cell.prototype.getAnchorY = function() { return this.y * cellSize }
        Cell.prototype.draw = function(color, cornerR) {
            fill(color)
            strokeWeight(0)
            rect(this.getAnchorX(), this.getAnchorY(), cellSize, cellSize, cornerR);
        }
    }
}

class EyeDrawer {
    static drawOpenEye(cell, dir) {
        return () => {
            const halfSize = cell.size/2
            let centerX = cell.getAnchorX() + halfSize 
            let centerY = cell.getAnchorY() + halfSize 
    
            stroke(color('black'))
            strokeWeight(0.2)
            fill(color('white'))
            
            ellipse(centerX, centerY, halfSize, halfSize)

            switch (dir) {
                case 0: centerX-=2; break;
                case 1: centerY-=2; break;
                case 2: centerX+=2; break;
                case 3: centerY+=2;
            }

            stroke(color('black'))
            fill(color('black'))
            ellipse(centerX, centerY, 4, 4)
        }
    }

    static drawClosedEye(cell, dir) {
        return () => {
            const halfSize = cell.size/2
            let centerX = cell.getAnchorX() + halfSize 
            let centerY = cell.getAnchorY() + halfSize 
    
            stroke(color('black')) 
            let x1 = centerX
            let y1 = centerY
            let x2 = centerX
            let y2 = centerY
    
            switch (dir) {
                case 0: case 2: x1-=3; x2+=3; break;
                case 1: case 3: y1-=3; y2+=3;
            }
    
            stroke(color('black'))
            strokeWeight(1.5)
            line(x1, y1, x2, y2)

            strokeWeight(0)
        }
    }

    static drawDeadEye(cell) {
        return () => {
            let thirdSize = cell.size/3
            let x1 = cell.getAnchorX() + thirdSize
            let y1 = cell.getAnchorY() + thirdSize
            let x2 = x1 + thirdSize
            let y2 = y1 + thirdSize

            stroke(color('black'))
            strokeWeight(1.5)
            line(x1, y1, x2, y2)
            line(x1, y2, x2, y1)
        }
    }
}

Cell.prototype.equalTo = function(that) {
    return this.x === that.x && this.y === that.y
}

Cell.prototype.hashKey = function() {
    return this.x.toString() + ',' + this.y.toString()
}


class Game {

    constructor(width, height, cellSize) {
        this.slowFps = 4;
        this.fastFps = 8
        this.isSlow = true
        this.width = width;
        this.height = height;
        this.reset();

        const scoreX =  width * cellSize - 34;
        const scoreY = height * cellSize - 24;

        this.drawScore = function() {
            fill(color("yellow"))
            strokeWeight(3)
            stroke(0)
            textSize(16)
            text(this.score, scoreX, scoreY); 
        }

        this.drawGameOver = function() {
            fill(color("yellow"))
            strokeWeight(3)
            stroke(0)
            textSize(24)
            text(`You got Schnekk'd !!   Score: ` + this.getScore(), 32, 190)
        }

        let speedX = 16
        let speedY = height * cellSize - 24

        this.drawSpeed = function() {
            fill(color("yellow"))
            strokeWeight(3)
            stroke(0)
            textSize(16)
            text(this.isSlow ? "slow" : "fast", speedX, speedY) 
        }
    }

    reset() {
        this.setPause(false)
        this.isOver = false
        this.score = 0
        this.snake = new Snake(new Cell(1,9))
        this.snake.pushHead(new Cell(2,9))
        this.dir = 2
        this.nextDir = this.dir
        this.apple = new Cell(12,9)
        this.resetOpenSpacesDict(this.snake.body)
    }

    resetOpenSpacesDict(occupiedCells) {
        this.openSpacesDict = {}
        for(let i=0; i<this.width; i++) {
            for(let j=0; j<this.height; j++) {
                const newCell = new Cell(i,j)
                this.openSpacesDict[newCell.hashKey()] = newCell
            }
        }
        for (const cell of occupiedCells) {
            delete this.openSpacesDict[cell.hashKey()]
        }
       
    }

    getFps() { return this.isSlow ? this.slowFps : this.fastFps }

    setPause(bool) {
        this.isPaused = bool
        frameRate( bool ? 0 : this.getFps() )
    }

    togglePause() { this.setPause(!this.isPaused) }

    isInBounds(cell) {
        return cell.x >=0 && cell.x < this.width && cell.y >= 0 && cell.y < this.height
    }

    getRandomOpenCell() {
        return this.openSpacesDict[random(Object.keys(this.openSpacesDict))]
    }
    
    getScore() { return this.snake.body.length }

    input(keyCode) {
        if (this.isPaused) return
        if (keyCode < LEFT_ARROW || keyCode > DOWN_ARROW) { return }
        this.nextDir = keyCode - 37
    }

    onEatApple() {
        
    }
    
    step() {

        let head = this.snake.getHead()
        let x = head.x
        let y = head.y

        // Ignore nextDir if it opposes dir
        if (this.nextDir + 2 != this.dir && this.nextDir - 2 != this.dir) {
            this.dir = this.nextDir
        }

        switch (this.dir) {
            case 0: x--; break;
            case 1: y--; break;
            case 2: x++; break;
            case 3: y++; break;
        }

        let newHead = new Cell(x, y)

        if (!this.isInBounds(newHead)) {
            this.isOver = true;
            return
        }

        for (const cell of this.snake.body) {
            if (cell.equalTo(newHead)) {
                this.isOver = true
                return
            }
        }

        if (this.apple.equalTo(newHead)) {
            this.score++
            this.snake.eatenAppleDict[newHead.hashKey()] = newHead
            this.apple = this.getRandomOpenCell()
            this.justAte = true
        } else {
            this.justAte = false
        }

        const oldTail = this.snake.popTail()
        this.openSpacesDict[oldTail.hashKey()] = oldTail // +1 for dict
    
        this.snake.pushHead(newHead)
        delete this.openSpacesDict[newHead.hashKey()] // -1 for dict

        for (const key in this.snake.eatenAppleDict) {
            const openCell = this.openSpacesDict[key]
            if (openCell) {
                this.snake.pushTail(openCell)
                delete this.snake.eatenAppleDict[key]
            }
        }
    }

    setSlow(isSlow) {
        this.isSlow = isSlow
        frameRate(this.getFps())
    }
    
    draw() {
        if (!this.isOver) this.step()

        let head = this.snake.getHead()
        let drawEye = (() => {
            if (this.isOver)  return EyeDrawer.drawDeadEye(head)
            if (this.justAte) return EyeDrawer.drawClosedEye(head, this.dir)
                              return EyeDrawer.drawOpenEye(head, this.dir) 
        })()

        this.snake.draw(color('#0f0'), this.justAte, drawEye)
        this.apple.draw(color('red'))
        this.drawScore()
        this.drawSpeed()
        if (this.isOver) this.drawGameOver()
    }
}


class Snake {
    constructor(initialCell) {
        this.body = [initialCell]
        this.eatenAppleDict = {}
    }

    getHead() { return this.body[0] }
    getTail() { return this.body[this.body.length - 1] }
    pushHead(cell) { this.body.unshift(cell) }
    pushTail(cell) { this.body.push(cell) }
    popTail() { return this.body.pop() }
    draw(snakeColor, justAte, drawEye) {
        for (const cell of this.body) { cell.draw(snakeColor) }
        for (const key in this.eatenAppleDict) {
            print(key)
            const cell = this.eatenAppleDict[key]
            let anchorX = cell.getAnchorX() - 2
            let anchorY = cell.getAnchorY() - 2
            fill(snakeColor)
            strokeWeight(0)
            let size = cell.size + 4
            rect(anchorX, anchorY, size, size)
        }
        drawEye()
    }
}


// ===================
// GAME SETUP AND LOOP
// ===================
let game;
let keyPressDict = {}

function setup() {

    // Add game state controls
    keyPressDict[49] = () => game.setSlow(true)  // Type 1 for slow mode
    keyPressDict[50] = () => game.setSlow(false)  // Type 2 for fast mode
    keyPressDict[32] = () => game.togglePause(false) // Type SPACE to toggle pause
    keyPressDict[13] = () => game.reset()  // Enter to reset (and unpause)

    createCanvas(400, 400);
    let canvasDim = 400;

    background(10);

    let cellSize = 20
    let gameDim = floor(canvasDim/cellSize)
    game = new Game(gameDim, gameDim, cellSize)
    Cell.setCellPrototypeFuncsFor(cellSize)

    frameRate(game.getFps()); 
}

function draw() {
    background(10);
    game.draw()
}

function keyPressed() {
    const callback = keyPressDict[keyCode]
    if (callback) callback()
    game.input(keyCode)
}