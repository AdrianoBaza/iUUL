import readline from 'readline-sync'
import { Controller } from './controllers/Controller.js'
import { View } from './views/View.js'

export class Aplicacao {
  constructor () {
    this.controller = new Controller()
  }

  iniciar () {
    let opcao
    do {
      View.mostrarMenuPrincipal()
      opcao = readline.question('Escolha uma opção: ')
      switch (opcao) {
        case '1':
          this.menuCadastroPacientes()
          break
        case '2':
          this.menuAgenda()
          break
        case '3':
          console.log('Fim do programa.')
          break
        default:
          console.log('Opção inválida.')
      }
    } while (opcao !== '3')
  }

  menuCadastroPacientes () {
    let opcao
    do {
      View.mostrarMenuCadastroPacientes()
      opcao = readline.question('Escolha uma opção: ')
      switch (opcao) {
        case '1':
          this.cadastrarPaciente()
          break
        case '2':
          this.excluirPaciente()
          break
        case '3':
          View.mostrarListaPacientes(this.controller.listarPacientesOrdenadoPorCPF())
          break
        case '4':
          View.mostrarListaPacientes(this.controller.listarPacientesOrdenadoPorNome())
          break
        case '5':
          console.log('Voltando para o menu principal...')
          break
        default:
          console.log('Opção inválida.')
      }
    } while (opcao !== '5')
  }

  menuAgenda () {
    let opcao
    do {
      View.mostrarMenuAgenda()
      opcao = readline.question('Escolha uma opção: ')
      switch (opcao) {
        case '1':
          this.agendarConsulta()
          break
        case '2':
          this.cancelarAgendamento()
          break
        case '3':
          this.listarAgenda()
          break
        case '4':
          this.listarAgendaPorPeriodo()
          break
        case '5':
          console.log('Voltando para o menu principal...')
          break
        default:
          console.log('Opção inválida.')
      }
    } while (opcao !== '5')
  }

  listarAgenda () {
    const agenda = this.controller.listarAgenda()
    View.mostrarListaAgenda(agenda)
  }

  listarAgendaPorPeriodo () {
    const dataInicial = readline.question('Data inicial: ')
    const dataFinal = readline.question('Data final: ')
    const agenda = this.controller.listarAgenda(dataInicial, dataFinal)
    View.mostrarListaAgenda(agenda)
  }

  cadastrarPaciente () {
    let cpf, nome, dataNascimento

    do {
      try {
        cpf = readline.question('CPF do paciente: ')
        this.validarCPF(cpf) // Esta função lança um erro se o CPF for inválido
      } catch (error) {
        console.log('Erro:', error.message)
        continue // Retorna ao início do loop para que o usuário insira novamente o CPF
      }

      try {
        nome = readline.question('Nome do paciente: ')
        this.validarNome(nome) // Esta função lança um erro se o nome for inválido
      } catch (error) {
        console.log('Erro:', error.message)
        continue // Retorna ao início do loop para que o usuário insira novamente o nome
      }

      dataNascimento = readline.question('Data de nascimento do paciente (DD/MM/AAAA): ')
      try {
        this.validarDataNascimento(dataNascimento) // Esta função lança um erro se a data de nascimento for inválida
      } catch (error) {
        console.log('Erro:', error.message)
        continue // Retorna ao início do loop para que o usuário insira novamente a data de nascimento
      }

      try {
        this.controller.cadastrarPaciente(cpf, nome, dataNascimento)
        console.log('Paciente cadastrado com sucesso.')
        break // Sai do loop se o paciente for cadastrado com sucesso
      } catch (error) {
        console.log('Erro ao cadastrar paciente:', error.message)
      }
    } while (true) // Loop continua até que um paciente seja cadastrado com sucesso
  }

  validarCPF (cpf) {
    if (!(/^\d{11}$/.test(cpf))) {
      throw new Error('O CPF deve ter exatamente 11 dígitos. Digite apenas os números')
    }
  }

  validarNome (nome) {
    if (nome.length < 5) {
      throw new Error('O nome deve ter pelo menos 5 caracteres.')
    }
  }

  validarDataNascimento (dataNascimento) {
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

    if (idadeAnos < 13 || (idadeAnos === 13 && (idadeMeses < 0 || (idadeMeses === 0 && idadeDias < 0)))) {
      throw new Error('O paciente deve ter pelo menos 13 anos de idade.')
    }

    return nascimento
  }

  excluirPaciente () {
    const cpf = readline.question('CPF do paciente a ser excluído: ')

    // Verificar se o paciente possui consultas agendadas para o futuro
    const consultasFuturas = this.controller.listarAgenda().some(consulta => {
      const hoje = new Date()
      const dataConsulta = new Date(consulta.data)
      return consulta.paciente.cpf === cpf && dataConsulta > hoje
    })

    if (consultasFuturas) {
      console.log('Este paciente possui consultas agendadas no futuro e não pode ser excluído.')
      return
    }

    // Excluir o paciente
    this.controller.excluirPaciente(cpf)
    console.log('Paciente excluído com sucesso.')
  }

  agendarConsulta () {
    const cpf = readline.question('CPF do paciente: ')
    const data = readline.question('Data da consulta: ')
    const horaInicio = readline.question('Hora inicial da consulta: ')
    const horaFim = readline.question('Hora final da consulta: ')
    this.controller.agendarConsulta(cpf, data, horaInicio, horaFim)
    console.log('Consulta agendada com sucesso.')
  }

  cancelarAgendamento () {
    const cpf = readline.question('CPF do paciente: ')
    const data = readline.question('Data da consulta: ')
    const horaInicio = readline.question('Hora inicial da consulta: ')
    this.controller.cancelarAgendamento(cpf, data, horaInicio)
    console.log('Agendamento cancelado com sucesso.')
  }
}

// Execução
const app = new Aplicacao()
app.iniciar()
