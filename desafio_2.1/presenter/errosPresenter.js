const _ = require('lodash')

class ErrosPresenter {
  constructor (erros) {
    this.erros = erros
  }

  getErros () {
    return {
      erros: this.erros.map((erro) => ({
        dados: erro.dados,
        erros: erro.erros.map((e) => ({
          campo: e.campo,
          mensagem: e.mensagem
        }))
      }))
    }
  }

  getErrosFormatados () {
    const errosFormatados = []
    for (const erro of this.erros) {
      errosFormatados.push({
        ...erro.dados,
        erros: _.map(erro.erros, 'mensagem').join(', ')
      })
    }
    return errosFormatados
  }
}

module.exports = ErrosPresenter
