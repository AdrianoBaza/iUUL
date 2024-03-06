const Aluno = require('./aluno')

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

module.exports = Turma
