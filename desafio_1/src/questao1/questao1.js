const readlineSync = require('readline-sync')
const Vertice = require('../Vertice')

const vertices = []

function criarVertices () {
  for (let i = 1; i <= 3; i++) {
    const x = parseFloat(readlineSync.question(`Digite o valor de x para o vertice ${i}: `))
    const y = parseFloat(readlineSync.question(`Digite o valor de y para o vertice ${i}: `))
    vertices.push(new Vertice(x, y))
  }
}

function exibirDistanciaEntreVertices () {
  for (let i = 0; i < vertices.length; i++) {
    for (let j = i + 1; j < vertices.length; j++) {
      console.log(`Distância entre o ${i + 1}º e o ${j + 1}º vértice:`, vertices[i].distancia(vertices[j]))
    }
  }
}

function compararVertices () {
  for (let i = 0; i < vertices.length; i++) {
    for (let j = i + 1; j < vertices.length; j++) {
      console.log(`Os vértices ${i + 1} e ${j + 1} são iguais?`, vertices[i].equals(vertices[j]))
    }
  }
}

function moverVertice () {
  const indiceVertice = parseInt(readlineSync.question('Digite o índice do vértice que deseja mover (1, 2 ou 3): ')) - 1
  const novoX = parseFloat(readlineSync.question('Digite o novo valor de x para mover o vértice: '))
  const novoY = parseFloat(readlineSync.question('Digite o novo valor de y para mover o vértice: '))

  vertices[indiceVertice].move(novoX, novoY)
  console.log(`Nova posição do ${indiceVertice + 1}º vértice:`, vertices[indiceVertice].x, vertices[indiceVertice].y)
}

const menu = `
---------------  Menu:  ---------------
  1. Criar Vértices
  2. Exibir Distância entre Vértices
  3. Comparar Vértices
  4. Mover Vértice
  5. Sair
`

function main () {
  let escolha
  do {
    console.log(menu)
    escolha = readlineSync.question('Escolha uma opcao: ')
    switch (escolha) {
      case '1':
        criarVertices(vertices)
        break
      case '2':
        exibirDistanciaEntreVertices(vertices)
        break
      case '3':
        compararVertices(vertices)
        break
      case '4':
        moverVertice(vertices)
        break
      case '5':
        console.log('Saindo...')
        break
      default:
        console.log('Opção inválida.')
    }
  } while (escolha !== '5')
}

main()
