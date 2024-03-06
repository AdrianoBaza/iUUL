const readlineSync = require('readline-sync')
const Vertice = require('../Vertice')

class Poligono {
  #vertices

  constructor (...vertices) {
    if (vertices.length < 3) {
      throw new Error('Um polígono deve ter pelo menos 3 vértices.')
    }
    this.#vertices = []
    for (const vertice of vertices) {
      this.addVertice(vertice)
    }
  }

  // adicionar um novo vértice v ao polígono
  addVertice (vertice) {
    if (!this.#vertices.some(v => v.equals(vertice))) {
      this.#vertices.push(vertice)
      return true
    }
    return false
  }

  // retornar o perímetro do polígono
  get perimetro () {
    let perimetro = 0
    for (let i = 0; i < this.#vertices.length; i++) {
      const proximo = (i + 1) % this.#vertices.length
      perimetro += this.#vertices[i].distancia(this.#vertices[proximo])
    }
    return perimetro.toFixed(2)
  }

  // retornar a quantidade de vértices do polígono
  get qtdVertices () {
    return this.#vertices.length
  }
}

function criarPoligono () {
  const vertices = []
  for (let i = 1; i <= 3; i++) {
    const x = parseFloat(readlineSync.question(`Digite o valor de x para o vértice ${i}: `))
    const y = parseFloat(readlineSync.question(`Digite o valor de y para o vértice ${i}: `))
    vertices.push(new Vertice(x, y))
  }
  return new Poligono(...vertices)
}

function menu () {
  console.log('------------------- POLÍGONO -------------------')
  console.log('\n1. Criar polígono')
  console.log('2. Adicionar vértice ao polígono')
  console.log('3. Calcular perímetro do polígono')
  console.log('4. Mostrar quantidade de vértices do polígono')
  console.log('5. Sair')
  return parseInt(readlineSync.question('Escolha uma opção: '))
}

let poligono

while (true) {
  const opcao = menu()
  switch (opcao) {
    case 1:
      try {
        poligono = criarPoligono()
        console.log('Polígono criado com sucesso!')
      } catch (error) {
        console.log(error.message)
      }
      break
    case 2:
      if (poligono) {
        const novoX = parseFloat(readlineSync.question('Digite o valor de x para o novo vértice: '))
        const novoY = parseFloat(readlineSync.question('Digite o valor de y para o novo vértice: '))
        const novoVertice = new Vertice(novoX, novoY)
        if (poligono.addVertice(novoVertice)) {
          console.log('Vértice adicionado com sucesso!')
        } else {
          console.log('O vértice já existe no polígono.')
        }
      } else {
        console.log('Crie um polígono primeiro.')
      }
      break
    case 3:
      if (poligono) {
        console.log('Perímetro do polígono:', poligono.perimetro)
      } else {
        console.log('Crie um polígono primeiro.')
      }
      break
    case 4:
      if (poligono) {
        console.log('Quantidade de vértices do polígono:', poligono.qtdVertices)
      } else {
        console.log('Crie um polígono primeiro.')
      }
      break
    case 5:
      console.log('Encerrando o programa.')
      process.exit()
      break
    default:
      console.log('Opção inválida.')
  }
}
