export class View {
  static mostrarMenuPrincipal () {
    console.log('Menu Principal')
    console.log('1-Cadastro de pacientes')
    console.log('2-Agenda')
    console.log('3-Fim')
  }

  static mostrarMenuCadastroPacientes () {
    console.log('Menu do Cadastro de Pacientes')
    console.log('1-Cadastrar novo paciente')
    console.log('2-Excluir paciente')
    console.log('3-Listar pacientes (ordenado por CPF)')
    console.log('4-Listar pacientes (ordenado por nome)')
    console.log('5-Voltar p/ menu principal')
  }

  static mostrarMenuAgenda () {
    console.log('Menu Agenda')
    console.log('1-Agendar consulta')
    console.log('2-Cancelar agendamento')
    console.log('3-Listar agenda')
    console.log('4-Listar agenda por período')
    console.log('5-Voltar p/ menu principal')
  }

  static mostrarListaPacientes (pacientes) {
    console.log('--------------------------------------------------------------------------------------------------')
    console.log('CPF\t\tNome\t\t\tDt. Nasc.\tIdade\n')
    console.log('--------------------------------------------------------------------------------------------------')
    pacientes.forEach(paciente => {
      if (!paciente) {
        console.log('Paciente inválido: paciente não está definido.')
        return
      }
      if (!paciente.cpf) {
        console.log('Paciente inválido: CPF não está definido.')
        return
      }
      if (!paciente.nome) {
        console.log('Paciente inválido: Nome não está definido.')
        return
      }
      if (!paciente.dataNascimento) {
        console.log('Paciente inválido: Data de nascimento não está definida.')
        return
      }
      if (paciente.idade === undefined) {
        console.log('Paciente inválido: Idade não está definida.')
        return
      }

      const cpf = paciente.cpf.padEnd(15)
      const nome = paciente.nome.padEnd(25)
      const dataNascimento = paciente.dataNascimento.padEnd(15)
      const idade = paciente.idade.toString().padEnd(5)
      console.log(`${cpf}${nome}${dataNascimento}${idade}`)
      console.log('--------------------------------------------------------------------------------------------------')
    })
  }

  static mostrarListaAgenda (consultas) {
    console.log('--------------------------------------------------------------------------------------------------')
    console.log('Data\t\tH.Ini\t\tH.Fim\t\tTempo\tNome\t\t\tDt.Nasc.')
    console.log('--------------------------------------------------------------------------------------------------')
    consultas.forEach(consulta => {
      const tempo = ((consulta.horaFim - consulta.horaInicio) / (1000 * 60)).toFixed(2)
      const nome = consulta.paciente.nome.padEnd(20)
      const dataNascimento = consulta.paciente.dataNascimento.padEnd(10) // Ajuste para melhorar a formatação
      console.log(`${consulta.data.toLocaleDateString()}\t${consulta.horaInicio.toLocaleTimeString()}\t${consulta.horaFim.toLocaleTimeString()}\t${tempo}\t${nome}\t${dataNascimento}`)
    })
    console.log('--------------------------------------------------------------------------------------------------')
  }
}
