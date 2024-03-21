import { Paciente } from '../models/Paciente.js'
import { Consulta } from '../models/Consulta.js'

export class Controller {
  constructor () {
    this.pacientes = []
    this.consultas = []
  }

  // Método auxiliar para converter uma string de data no formato DD/MM/AAAA para um objeto Date
  parseDate (dateString) {
    const [day, month, year] = dateString.split('/')
    return new Date(year, month - 1, day)
  }

  // Método auxiliar para converter uma string de hora no formato HHMM para um objeto Date
  parseTime (timeString) {
    const hours = parseInt(timeString.substring(0, 2))
    const minutes = parseInt(timeString.substring(2, 4))
    return new Date(2000, 0, 1, hours, minutes)
  }

  cadastrarPaciente (cpf, nome, dataNascimento) {
    // Verifica se já existe um paciente com o mesmo CPF
    if (this.pacientes.some(paciente => paciente.cpf === cpf)) {
      throw new Error('Já existe um paciente cadastrado com esse CPF.')
    }

    // Calcula a idade com base na data de nascimento
    const idade = this.calcularIdade(dataNascimento)

    // Tenta criar o paciente, lançando erros se os dados forem inválidos
    const paciente = new Paciente(cpf, nome, dataNascimento, idade)

    // Se não houve erro, adiciona o paciente à lista
    this.pacientes.push(paciente)
  }

  calcularIdade (dataNascimento) {
    // Converte a data de nascimento para um objeto Date
    const [dia, mes, ano] = dataNascimento.split('/')
    const dataNascimentoObj = new Date(ano, mes - 1, dia)

    // Calcula a idade com base na data de nascimento
    const hoje = new Date()
    let idade = hoje.getFullYear() - dataNascimentoObj.getFullYear()
    const mesAtual = hoje.getMonth()
    const diaAtual = hoje.getDate()
    const mesNascimento = dataNascimentoObj.getMonth()
    const diaNascimento = dataNascimentoObj.getDate()
    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
      idade--
    }

    return idade
  }

  excluirPaciente (cpf) {
    this.pacientes = this.pacientes.filter(paciente => paciente.cpf !== cpf)
  }

  agendarConsulta (cpf, dataConsulta, horaInicio, horaFim) {
    const paciente = this.pacientes.find(p => p.cpf === cpf)

    // Verificar se o paciente está cadastrado
    if (!paciente) {
      console.log('CPF não encontrado. O agendamento não pode ser realizado.')
      return
    }

    // Verificar o formato da data da consulta
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/
    if (!regexData.test(dataConsulta)) {
      console.log('Formato inválido para a data da consulta. Use o formato DD/MM/AAAA.')
      return
    }

    // Verificar o formato das horas de início e fim
    const regexHora = /^\d{4}$/
    if (!regexHora.test(horaInicio) || !regexHora.test(horaFim)) {
      console.log('Formato inválido para a hora. Use o formato HHMM.')
      return
    }

    // Converter a data e hora para objetos Date
    const dataConsultaObj = this.parseDate(dataConsulta)
    const horaInicioObj = this.parseTime(horaInicio)
    const horaFimObj = this.parseTime(horaFim)

    // Verificar se a data da consulta é futura e a hora final é maior que a hora inicial
    const hoje = new Date()
    if (dataConsultaObj <= hoje || (dataConsultaObj.getTime() === hoje.getTime() && horaInicioObj >= horaFimObj)) {
      console.log('A data e hora da consulta devem ser futuras e a hora final deve ser maior que a inicial.')
      return
    }

    // Verificar se o paciente já possui um agendamento futuro
    const agendamentosFuturos = this.consultas.some(consulta => {
      return consulta.paciente.cpf === cpf && consulta.data > hoje
    })
    if (agendamentosFuturos) {
      console.log('O paciente já possui um agendamento futuro e não pode realizar outro.')
      return
    }

    // Verificar se há sobreposição de horários
    const horarioInicioConsulta = new Date(dataConsultaObj)
    horarioInicioConsulta.setHours(horaInicioObj.getHours(), horaInicioObj.getMinutes())

    const horarioFimConsulta = new Date(dataConsultaObj)
    horarioFimConsulta.setHours(horaFimObj.getHours(), horaFimObj.getMinutes())

    const sobreposicao = this.consultas.some(consulta => {
      const horarioInicioConsultaExistente = new Date(consulta.data)
      horarioInicioConsultaExistente.setHours(consulta.horaInicio.getHours(), consulta.horaInicio.getMinutes())

      const horarioFimConsultaExistente = new Date(consulta.data)
      horarioFimConsultaExistente.setHours(consulta.horaFim.getHours(), consulta.horaFim.getMinutes())

      return (horarioInicioConsulta >= horarioInicioConsultaExistente && horarioInicioConsulta < horarioFimConsultaExistente) ||
              (horarioFimConsulta > horarioInicioConsultaExistente && horarioFimConsulta <= horarioFimConsultaExistente) ||
              (horarioInicioConsulta <= horarioInicioConsultaExistente && horarioFimConsulta >= horarioFimConsultaExistente)
    })

    if (sobreposicao) {
      console.log('Já existe uma consulta agendada para esse horário.')
      return
    }

    // Agendar a consulta
    const novaConsulta = new Consulta(paciente, dataConsultaObj, horaInicioObj, horaFimObj)
    this.consultas.push(novaConsulta)
    console.log('Consulta agendada com sucesso.')
  }

  // Método auxiliar para arredondar o horário para o intervalo de 15 minutos
  roundTime (time) {
    const coeff = 1000 * 60 * 15
    return new Date(Math.round(time.getTime() / coeff) * coeff)
  }

  cancelarAgendamento (cpf, dataConsulta, horaInicio) {
    // Converter a data e hora para objetos Date
    const dataConsultaObj = this.parseDate(dataConsulta)
    const horaInicioObj = this.parseTime(horaInicio)

    // Verificar se a data da consulta é futura e a hora inicial é maior que a hora atual
    const hoje = new Date()
    if (dataConsultaObj < hoje || (dataConsultaObj.getTime() === hoje.getTime() && horaInicioObj <= hoje)) {
      console.log('Não é possível cancelar um agendamento passado ou no mesmo horário que o atual.')
      return
    }

    // Encontrar a consulta correspondente
    const index = this.consultas.findIndex(consulta => {
      return consulta.paciente.cpf === cpf &&
                consulta.data.getTime() === dataConsultaObj.getTime() &&
                consulta.horaInicio.getTime() === horaInicioObj.getTime()
    })

    // Se a consulta correspondente for encontrada, cancelar
    if (index !== -1) {
      this.consultas.splice(index, 1)
      console.log('Agendamento cancelado com sucesso.')
    } else {
      console.log('Não foi encontrado nenhum agendamento correspondente para cancelar.')
    }
  }

  static mostrarListaPacientes (pacientes) {
    console.log('CPF\t\tNome\t\t\t\tDt. Nasc.\tIdade\n')
    pacientes.forEach(paciente => {
      if (paciente && paciente.cpf) { // Verifica se paciente e paciente.cpf são definidos
        const cpf = paciente.cpf.padEnd(15)
        const nome = (paciente.nome || '').padEnd(30) // Verifica se paciente.nome é definido
        const dataNascimento = (paciente.dataNascimento || '').padEnd(15) // Verifica se paciente.dataNascimento é definido
        const idade = (paciente.idade || '').toString().padEnd(5) // Verifica se paciente.idade é definido
        console.log(`${cpf}${nome}${dataNascimento}${idade}`)
      } else {
        console.log('Paciente inválido.')
      }
    })
  }

  listarPacientesOrdenadoPorCPF () {
    // const hoje = new Date()
    return this.pacientes.sort((a, b) => a.cpf.localeCompare(b.cpf))
      .map(paciente => {
        const idade = this.calcularIdade(paciente.dataNascimento)
        return {
          cpf: paciente.cpf,
          nome: paciente.nome,
          dataNascimento: paciente.dataNascimento,
          idade
        }
      })
  }

  listarPacientesOrdenadoPorNome () {
    return this.pacientes.sort((a, b) => a.nome.localeCompare(b.nome))
      .map(paciente => {
        const idade = this.calcularIdade(paciente.dataNascimento)
        return {
          cpf: paciente.cpf,
          nome: paciente.nome,
          dataNascimento: paciente.dataNascimento,
          idade
        }
      })
  }

  listarAgenda (dataInicial, dataFinal) {
    let agendaFiltrada = this.consultas

    if (dataInicial && dataFinal) {
      // Filtrar a agenda pelo período especificado
      const dataInicialObj = this.parseDate(dataInicial)
      const dataFinalObj = this.parseDate(dataFinal)
      agendaFiltrada = agendaFiltrada.filter(consulta => consulta.data >= dataInicialObj && consulta.data <= dataFinalObj)
    }

    // Ordenar a agenda por data e hora inicial
    agendaFiltrada.sort((a, b) => a.data - b.data || a.horaInicio - b.horaInicio)

    return agendaFiltrada
  }
}
