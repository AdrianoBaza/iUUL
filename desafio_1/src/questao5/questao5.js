// import { createInterface } from 'readline'
const readline = require('readline')

// Cria uma interface de leitura e escrita usando 'readline', configurando a entrada para process.stdin e a saída para process.stdout
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Faz uma pergunta ao usuário e retorna a resposta
function perguntar (pergunta) {
  return new Promise((resolve, reject) => {
    rl.question(pergunta, (resposta) => {
      resolve(resposta.trim())
    })
  })
}

// Valida o nome do cliente e permite apenas se tiver 5 caracteres
async function validarNome (nome) {
  if (nome.length < 5) {
    throw new Error('O nome deve ter pelo menos 5 caracteres.') // Lança um erro se o nome tiver menos de 5 caracteres
  }
  return nome
}

// Valida o CPF do cliente e permite apenas com 11 digitos
async function validarCPF (cpf) {
  if (!(/^\d{11}$/.test(cpf))) {
    throw new Error('O CPF deve ter exatamente 11 dígitos. Digite apenas os números') // Lança um erro se o CPF não tiver 11 dígitos numéricos
  }
  return cpf
}

async function validarDataNascimento (dataNascimento) {
  // Verifica se o formato da data está correto
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataNascimento)) {
    throw new Error('Formato de data inválido. Por favor, use o formato DD/MM/AAAA.')
  }

  const [dia, mes, ano] = dataNascimento.split('/')
  const nascimento = new Date(ano, mes - 1, dia) // Corrigido para criar corretamente o objeto Date

  // Verifica se a data de nascimento é válida
  if (isNaN(nascimento.getTime())) {
    throw new Error('Data de nascimento inválida. Por favor, verifique os valores inseridos.')
  }

  const agora = new Date()

  const idadeAnos = agora.getFullYear() - nascimento.getFullYear()
  const idadeMeses = agora.getMonth() - nascimento.getMonth()
  const idadeDias = agora.getDate() - nascimento.getDate()

  if (idadeAnos < 18 || (idadeAnos === 18 && (idadeMeses < 0 || (idadeMeses === 0 && idadeDias < 0)))) {
    throw new Error('O cliente deve ter pelo menos 18 anos de idade.')
  }

  return nascimento
}

// Valida a renda mensal do cliente
async function validarRenda (renda) {
  const rendaConvertida = parseFloat(renda.replace(',', '.'))
  if (isNaN(rendaConvertida)) {
    throw new Error('A renda mensal deve ser um número.')
  }
  return rendaConvertida
}

// Valida o estado civil do cliente
async function validarEstadoCivil (estadoCivil) {
  const estadosCivisValidos = ['C', 'S', 'V', 'D']
  if (!estadosCivisValidos.includes(estadoCivil.toUpperCase())) {
    throw new Error('Estado civil inválido. Use C, S, V ou D.') // Lança um erro se o estado civil não for um dos valores permitidos
  }
  return estadoCivil.toUpperCase()
}

// Valida o número de dependentes do cliente e lança um erro se o número de dependentes não for um número inteiro entre 0 e 10
async function validarDependentes (dependentes) {
  return dependentes
}

// Captura os dados do cliente, valida e os exibe formatados
async function obterEntrada () {
  const dadosCliente = {}

  try {
    console.log('---------- CADASTRO DE CLIENTES ----------')

    dadosCliente.nome = await perguntar('Nome: ')
    dadosCliente.nome = await validarNome(dadosCliente.nome)

    dadosCliente.cpf = await perguntar('CPF: ')
    dadosCliente.cpf = await validarCPF(dadosCliente.cpf)

    dadosCliente.dataNascimento = await perguntar('Data de nascimento (DD/MM/AAAA): ')
    dadosCliente.dataNascimento = await validarDataNascimento(dadosCliente.dataNascimento)

    dadosCliente.renda = await perguntar('Renda mensal: ')
    dadosCliente.renda = await validarRenda(dadosCliente.renda)

    dadosCliente.estadoCivil = await perguntar('Estado civil (C, S, V ou D): ')
    dadosCliente.estadoCivil = await validarEstadoCivil(dadosCliente.estadoCivil)

    dadosCliente.dependentes = await perguntar('Número de dependentes: ')
    dadosCliente.dependentes = await validarDependentes(dadosCliente.dependentes)

    // Exibe os dados do cliente formatados
    console.log('----- DADOS DO CLIENTE -----')
    console.log(`Nome: ${dadosCliente.nome}`)
    console.log(`CPF: ${dadosCliente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}`)
    console.log(`Data de Nascimento: ${new Date(dadosCliente.dataNascimento).toLocaleDateString('pt-BR')}`)
    console.log(`Renda Mensal: R$ ${dadosCliente.renda.toFixed(2).replace('.', ',')}`)
    console.log(`Estado Civil: ${dadosCliente.estadoCivil}`)
    console.log(`Dependentes: ${dadosCliente.dependentes}`)
  } catch (erro) {
    console.error('Erro:', erro.message)
    await obterEntrada()
  } finally {
    rl.close()
  }
}

obterEntrada()
