const fs = require('fs')
const spdy = require('spdy')
const path = require('path')
const express = require('express')

const getFiles = require('./get-files')

const publicFiles = getFiles(path.resolve(__dirname, '../public/'))

const key = fs.readFileSync(path.resolve(__dirname, '../ssl/key.pem'))
const cert = fs.readFileSync(path.resolve(__dirname, '../ssl/cert.pem'))

var app = express()
const server = spdy.createServer({ cert, key }, app)

app.get('*', (req, res, next) => {
  const fileName = '/main.js'

  var stream = res.push('/main.js', {
    request: {
      accept: '*/*'
    },
    response: {
      'content-type': 'application/javascript'
    }
  })

  stream.on('error', error => {
    console.error(error);
  })

  stream.end(fs.readFileSync(path.join(__dirname, '../public', 'main.js')))

  next()
})

app.get('*', (req, res, next) => {
  const file = req.url === '/' ? 'index.html' : req.url

  res.sendFile(path.join(__dirname, '/../public', file))
})

server.listen(process.env.PORT || 3003, () => {
  const { address, port } = server.address()
  console.log(`Server listening at ${address}:${port}`)
})
