const luxon = require('luxon')
const { lerArquivo, escreverArquivo } = require('./utils')
const { Validacao } = require('./validacaoLogica')
const ErrosPresenter = require('./presenter/errosPresenter')

const ARQUIVO_ENTRADA = process.argv[2]
const DATA_HORA = luxon.DateTime.now().toFormat('ddMMyyyy-HHmmss')
const ARQUIVO_SAIDA = `./data/erros-${DATA_HORA}.json`

async function main () {
  try {
    // Leitura do arquivo de entrada
    const dados = JSON.parse(await lerArquivo(ARQUIVO_ENTRADA))

    // Validação dos dados
    const erros = []
    for (const cliente of dados) {
      const errosCliente = Validacao.validarCliente(cliente)
      if (errosCliente.length) {
        erros.push({ dados: cliente, erros: errosCliente })
      }
    }

    // Geração do arquivo de saída
    const conteudoSaida = JSON.stringify(new ErrosPresenter(erros).getErrosFormatados())
    await escreverArquivo(ARQUIVO_SAIDA, conteudoSaida)
  } catch (err) {
    // Tratamento de erros de leitura, validação ou geração de arquivo
    if (err.code === 'ENOENT') {
      console.error(`Arquivo de entrada não encontrado: ${ARQUIVO_ENTRADA}`)
    } else if (err.code === 'EACCES') {
      console.error(`Permissão negada para acessar o arquivo: ${ARQUIVO_ENTRADA}`)
    } else if (err.code === 'JSON_ERROR') {
      console.error('Erro ao parsear o arquivo JSON de entrada.')
    } else if (err instanceof TypeError) {
      console.error('Erro de validação: ', err.message)
    } else {
      console.error('Erro inesperado:', err.message)
    }
  } finally {
    // Mensagem de finalização
    console.log('Processo finalizado.')
  }
}

main()
