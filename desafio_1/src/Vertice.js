class Vertice {
  #x
  #y

  constructor (x, y) {
    this.#x = x
    this.#y = y
  }

  get x () {
    return this.#x
  }

  get y () {
    return this.#y
  }

  distancia (outroVertice) {
    const deltaX = this.#x - outroVertice.x
    const deltaY = this.#y - outroVertice.y
    return Math.sqrt(deltaX ** 2 + deltaY ** 2)
  }

  move (novoX, novoY) {
    this.#x = novoX
    this.#y = novoY
  }

  equals (outroVertice) {
    if (outroVertice instanceof Vertice) {
      return this.#x === outroVertice.x && this.#y === outroVertice.y
    } else {
      return false
    }
  }
}

module.exports = Vertice
