class Cliente {
  constructor({ nome, cpf, dtNascimento, rendaMensal, estadoCivil }) {
    this.nome = nome;
    this.cpf = cpf;
    this.dtNascimento = dtNascimento;
    this.rendaMensal = rendaMensal;
    this.estadoCivil = estadoCivil;
  }
}

module.exports = Cliente;
