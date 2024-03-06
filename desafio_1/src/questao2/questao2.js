const Vertice = require('../Vertice')
const readlineSync = require('readline-sync')

class Triangulo {
  #vertice1
  #vertice2
  #vertice3

  constructor (vertice1, vertice2, vertice3) {
    if (!this.verificarTriangulo(vertice1, vertice2, vertice3)) {
      throw new Error('Os vértices fornecidos não formam um triângulo válido.')
    }

    this.#vertice1 = vertice1
    this.#vertice2 = vertice2
    this.#vertice3 = vertice3
  }

  // verificar se é triângulo
  verificarTriangulo (vertice1, vertice2, vertice3) {
    const lado1 = vertice1.distancia(vertice2)
    const lado2 = vertice2.distancia(vertice3)
    const lado3 = vertice3.distancia(vertice1)

    return lado1 + lado2 > lado3 && lado1 + lado3 > lado2 && lado2 + lado3 > lado1
  }

  // verificar se dois triângulos são iguais
  equals (outroTriangulo) {
    const vertices1 = [this.#vertice1, this.#vertice2, this.#vertice3]
    const vertices2 = [outroTriangulo.vertice1, outroTriangulo.vertice2, outroTriangulo.vertice3]

    vertices1.sort((a, b) => (a.x === b.x ? a.y - b.y : a.x - b.x))
    vertices2.sort((a, b) => (a.x === b.x ? a.y - b.y : a.x - b.x))

    for (let i = 0; i < 3; i++) {
      if (!vertices1[i].equals(vertices2[i])) {
        return false
      }
    }
    return true
  }

  // retornar o perímetro do triângulo
  get perimetro () {
    const lado1 = this.#vertice1.distancia(this.#vertice2)
    const lado2 = this.#vertice2.distancia(this.#vertice3)
    const lado3 = this.#vertice3.distancia(this.#vertice1)

    return (lado1 + lado2 + lado3).toFixed(2)
  }

  // retornar o tipo do triângulo
  tipo () {
    const lado1 = this.#vertice1.distancia(this.#vertice2)
    const lado2 = this.#vertice2.distancia(this.#vertice3)
    const lado3 = this.#vertice3.distancia(this.#vertice1)

    if (lado1 === lado2 && lado1 === lado3) {
      return 'Equilátero'
    } else if (lado1 === lado2 || lado1 === lado3 || lado2 === lado3) {
      return 'Isósceles'
    } else {
      return 'Escaleno'
    }
  }

  // clonar um triângulo
  clone () {
    return new Triangulo(this.#vertice1, this.#vertice2, this.#vertice3)
  }

  /// retornar a área do triângulo
  get area () {
    const lado1 = this.#vertice1.distancia(this.#vertice2)
    const lado2 = this.#vertice2.distancia(this.#vertice3)
    const lado3 = this.#vertice3.distancia(this.#vertice1)
    const semiperimetro = (lado1 + lado2 + lado3) / 2 // Semiperímetro S

    return Math.sqrt(semiperimetro * (semiperimetro - lado1) * (semiperimetro - lado2) * (semiperimetro - lado3)).toFixed(2)
  }
}

function criarTriangulos () {
  console.log('---------- CRIAR TRIÂNGULOS ----------')
  const triangulos = []

  for (let i = 1; i <= 3; i++) {
    console.log(`Digite os vértices do triângulo ${i}:`)
    const vertice1 = criarVertice()
    const vertice2 = criarVertice()
    const vertice3 = criarVertice()

    try {
      const triangulo = new Triangulo(vertice1, vertice2, vertice3)
      triangulos.push(triangulo)
      console.log(`Triângulo ${i} criado com sucesso.`)
    } catch (error) {
      console.log(`Erro ao criar o triângulo ${i}: ${error.message}`)
      i--
    }
  }

  return triangulos
}

function criarVertice () {
  const x = parseFloat(readlineSync.question('Digite o valor de x: '))
  const y = parseFloat(readlineSync.question('Digite o valor de y: '))
  return new Vertice(x, y)
}

function main () {
  const triangulos = criarTriangulos()

  for (let i = 0; i < triangulos.length; i++) {
    console.log(`\nTriângulo ${i + 1}:`)
    console.log('Perímetro:', triangulos[i].perimetro)
    console.log('Tipo:', triangulos[i].tipo())
    console.log('Área:', triangulos[i].area)
    console.log('Clone:', triangulos[i].clone())
  }
}

module.exports = Triangulo

main()
