const readline = require('readline')
const Turma = require('./Turma')

function menu () {
  console.log('---------- CONTROLE DE TURMA ----------')
  console.log('1. Inserir aluno na turma')
  console.log('2. Lançar as notas do aluno')
  console.log('3. Remover aluno da turma')
  console.log('4. Imprimir a lista da turma')
  console.log('5. Sair')
  rl.question('Escolha uma opção: ', (opcao) => {
    switch (opcao) {
      case '1':
        console.log('----- INSERIR ALUNO -----')
        rl.question('Nome do aluno: ', (nome) => {
          rl.question('Matrícula do aluno: ', (matricula) => {
            turma.inserirAluno(matricula, nome)
            menu()
          })
        })
        break
      case '2':
        console.log('----- LANÇAR NOTAS -----')
        rl.question('Matrícula do aluno: ', (matricula) => {
          rl.question('Nota da P1 (deixe em branco para não preencher): ', (notaP1) => {
            rl.question('Nota da P2 (deixe em branco para não preencher): ', (notaP2) => {
              turma.lancarNota(matricula, notaP1, notaP2)
              menu()
            })
          })
        })
        break
      case '3':
        console.log('----- REMOVER ALUNO -----')
        rl.question('Matrícula do aluno a ser removido: ', (matricula) => {
          turma.removerAluno(matricula)
          menu()
        })
        break
      case '4':
        turma.imprimirLista()
        menu()
        break
      case '5':
        rl.close()
        break
      default:
        console.log('Opção inválida. Tente novamente.')
        menu()
        break
    }
  })
}

const turma = new Turma()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

menu()

/* const readline = require('readline')

class Turma {
  constructor () {
    this.alunos = []
  }

  // Inserir um aluno na turma
  inserirAluno (matricula, nome) {
    if (!this.alunos.some(aluno => aluno.matricula === matricula)) {
      this.alunos.push(new Aluno(matricula, nome))
      console.log('Aluno inserido com sucesso.')
    } else {
      console.log('Já existe um aluno com essa matrícula.')
    }
  }

  // Remover um aluno da turma a partir da sua matrícula
  removerAluno (matricula) {
    const index = this.alunos.findIndex(aluno => aluno.matricula === matricula)
    if (index !== -1) {
      this.alunos.splice(index, 1)
      console.log('Aluno removido com sucesso.')
    } else {
      console.log('Aluno não encontrado.')
    }
  }

  // Lançar a nota de um aluno
  lancarNota (matricula, notaP1, notaP2) {
    const aluno = this.alunos.find(aluno => aluno.matricula === matricula)
    if (aluno) {
      aluno.notaP1 = notaP1 !== '' ? parseFloat(notaP1) : null
      aluno.notaP2 = notaP2 !== '' ? parseFloat(notaP2) : null
      console.log('Notas lançadas com sucesso.')
    } else {
      console.log('Aluno não encontrado.')
    }
  }

  // Imprimir lista de alunos
  imprimirLista () {
    console.log('----------------------------------------')
    console.log('Matrícula Nome             P1   P2   NF')
    console.log('----------------------------------------')
    this.alunos.sort((a, b) => a.nome.localeCompare(b.nome)).forEach(aluno => {
      console.log(`${aluno.matricula.padEnd(9)} ${aluno.nome.padEnd(15)} ${aluno.notaP1 ? aluno.notaP1.toFixed(1).padStart(4) : '-'.padStart(4)} ${aluno.notaP2 ? aluno.notaP2.toFixed(1).padStart(4) : '-'.padStart(4)} ${aluno.calcularNotaFinal().padStart(4)}`)
    })
    console.log('----------------------------------------')
  }
}

class Aluno {
  constructor (matricula, nome) {
    this.matricula = matricula
    this.nome = nome
    this.notaP1 = null
    this.notaP2 = null
  }

  // Calcular a nota final
  calcularNotaFinal () {
    if (this.notaP1 !== null && this.notaP2 !== null) {
      return ((this.notaP1 + this.notaP2) / 2).toFixed(1)
    } else if (this.notaP1 !== null) {
      return (this.notaP1 / 2).toFixed(1)
    } else if (this.notaP2 !== null) {
      return (this.notaP2 / 2).toFixed(1)
    } else {
      return '0.0'
    }
  }
}

function menu () {
  console.log('---------- CONTROLE DE TURMA ----------')
  console.log('1. Inserir aluno na turma')
  console.log('2. Lançar as notas do aluno')
  console.log('3. Remover aluno da turma')
  console.log('4. Imprimir a lista da turma')
  console.log('5. Sair')
  rl.question('Escolha uma opção: ', (opcao) => {
    switch (opcao) {
      case '1':
        console.log('----- INSERIR ALUNO -----')
        rl.question('Nome do aluno: ', (nome) => {
          rl.question('Matrícula do aluno: ', (matricula) => {
            turma.inserirAluno(matricula, nome)
            menu()
          })
        })
        break
      case '2':
        console.log('----- LANÇAR NOTAS -----')
        rl.question('Matrícula do aluno: ', (matricula) => {
          rl.question('Nota da P1 (deixe em branco para não preencher): ', (notaP1) => {
            rl.question('Nota da P2 (deixe em branco para não preencher): ', (notaP2) => {
              turma.lancarNota(matricula, notaP1, notaP2)
              menu()
            })
          })
        })
        break
      case '3':
        console.log('----- REMOVER ALUNO -----')
        rl.question('Matrícula do aluno a ser removido: ', (matricula) => {
          turma.removerAluno(matricula)
          menu()
        })
        break
      case '4':
        turma.imprimirLista()
        menu()
        break
      case '5':
        rl.close()
        break
      default:
        console.log('Opção inválida. Tente novamente.')
        menu()
        break
    }
  })
}

const turma = new Turma()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

module.exports = { Turma, Aluno }

menu()
 */
