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

module.exports = Aluno
