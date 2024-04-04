const { DateTime } = require('luxon')

function validarDataNascimento (dataNascimento) {
  // Validação do formato da data
  if (!/\d{2}\/\d{2}\/\d{4}/.test(dataNascimento)) {
    return false
  }

  // Validação da data ser no passado
  const dataNascimentoLuxon = DateTime.fromFormat(dataNascimento, 'dd/MM/yyyy')
  if (dataNascimentoLuxon > DateTime.now()) {
    return false
  }

  // Validação da maioridade (18 anos)
  return DateTime.now() > dataNascimentoLuxon.plus({ years: 18 })
}

function validarCpf (cpf) {
  // Validação do formato do CPF
  if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
    return false
  }

  // Cálculo dos dígitos verificadores
  const dv1 = calcularDigitoVerificador(cpf.substring(0, 9))
  const dv2 = calcularDigitoVerificador(cpf.substring(0, 9) + dv1)

  // Validação dos dígitos verificadores
  return dv1 === cpf[10] && dv2 === cpf[11]
}

function calcularDigitoVerificador (numero) {
  let soma = 0
  let multiplicador = 10
  for (let i = 0; i < numero.length; i++) {
    soma += numero[i] * multiplicador
    multiplicador--
  }

  const resto = soma % 11
  return resto < 2 ? 0 : 11 - resto
}

class Validacao {
  static validarCliente (cliente) {
    const erros = []

    // Validação do nome
    if (!cliente.nome || cliente.nome.length < 5 || cliente.nome.length > 60) {
      erros.push({
        campo: 'nome',
        mensagem: 'Nome inválido. Deve ter entre 5 e 60 caracteres.'
      })
    }

    // Validação da data de nascimento
    function validarDataNascimento (data) {
      // Verifica se a data é um objeto Date válido
      if (!(data instanceof Date) || isNaN(data.getTime())) {
        return false
      }

      // Converte a data para o formato DD/MM/AAAA
      const dataFormatada = data.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })

      // Expressão regular para validar o formato da data
      const regexData = /^([0-2][0-9]|(3)[0-1])(\/)([0-1][0-9])(\/)([1-2][0-9][0-9][0-9])$/

      // Valida o formato da data
      if (!regexData.test(dataFormatada)) {
        return false
      }

      // Calcula a idade do cliente em anos
      const idade = calcularIdade(data)

      // Verifica se o cliente tem pelo menos 18 anos
      return idade >= 18
    }

    // Função para calcular a idade em anos
    function calcularIdade (data) {
      const dataAtual = new Date()
      const anoAtual = dataAtual.getFullYear()
      const anoNascimento = data.getFullYear()

      return anoAtual - anoNascimento
    }

    if (!validarDataNascimento(cliente.dtNascimento)) {
      erros.push({
        campo: 'dtNascimento',
        mensagem: 'Data de nascimento inválida. Deve estar no formato DD/MM/AAAA e o cliente deve ter pelo menos 18 anos.'
      })
    }

    // Validação do CPF
    if (!validarCpf(cliente.cpf)) {
      erros.push({
        campo: 'cpf',
        mensagem: 'CPF inválido. Deve estar no formato XXX.XXX.XXX-XX.'
      })
    }

    // Validação da renda mensal
    if (cliente.rendaMensal && !/^\d+(\.\d{2})?$/.test(cliente.rendaMensal)) {
      erros.push({
        campo: 'rendaMensal',
        mensagem: 'Renda mensal inválida. Deve ser um valor com duas casas decimais e vírgula decimal.'
      })
    }

    // Validação do estado civil
    if (cliente.estadoCivil && !/[CSVD]/.test(cliente.estadoCivil.toUpperCase())) {
      erros.push({
        campo: 'estadoCivil',
        mensagem: 'Estado civil inválido. Deve ser C, S, V ou D.'
      })
    }

    return erros
  }

  static maiorIdade (dtNascimento) {
    return DateTime.now() > DateTime.fromFormat(dtNascimento, 'ddMMyyyy').plus({ years: 18 })
  }
}

module.exports = { Validacao, validarDataNascimento, validarCpf }
