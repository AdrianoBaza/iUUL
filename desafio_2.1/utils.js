const fs = require('fs')

function lerArquivo (caminho) {
  return new Promise((resolve, reject) => {
    fs.readFile(caminho, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

function escreverArquivo (caminho, conteudo) {
  return new Promise((resolve, reject) => {
    fs.writeFile(caminho, conteudo, 'utf-8', (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

module.exports = { lerArquivo, escreverArquivo }
