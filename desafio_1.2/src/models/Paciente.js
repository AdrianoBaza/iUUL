export class Paciente {
  constructor (cpf, nome, dataNascimento) {
    this.cpf = cpf
    this.nome = nome
    this.dataNascimento = dataNascimento
  }

  static validarNome (nome) {
    if (nome.length < 5) {
      throw new Error('O nome deve ter pelo menos 5 caracteres.') // Lança um erro se o nome tiver menos de 5 caracteres
    }
    return nome
  }

  static validarCPF (cpf) {
    if (!(/^\d{11}$/.test(cpf))) {
      throw new Error('O CPF deve ter exatamente 11 dígitos. Digite apenas os números') // Lança um erro se o CPF não tiver 11 dígitos numéricos
    }
    return cpf
  }

  static validarDataNascimento (dataNascimento) {
    // Verifica se o formato da data está correto
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataNascimento)) {
      throw new Error('Formato de data inválido. Por favor, use o formato DD/MM/AAAA.')
    }

    const [dia, mes, ano] = dataNascimento.split('/')
    const nascimento = new Date(ano, mes - 1, dia) // criar o objeto Date

    // Verifica se a data de nascimento é válida
    if (isNaN(nascimento.getTime())) {
      throw new Error('Data de nascimento inválida. Por favor, verifique os valores inseridos.')
    }

    const agora = new Date()

    const idadeAnos = agora.getFullYear() - nascimento.getFullYear()
    const idadeMeses = agora.getMonth() - nascimento.getMonth()
    const idadeDias = agora.getDate() - nascimento.getDate()

    if (idadeAnos < 13 || (idadeAnos === 13 && (idadeMeses < 0 || (idadeMeses === 0 && idadeDias < 0)))) {
      throw new Error('O paciente deve ter pelo menos 13 anos de idade.')
    }

    return nascimento
  }
}
