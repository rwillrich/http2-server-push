const fs = require('fs')
const http2 = require('http2')
const path = require('path')

const getFiles = require('./get-files')

const {
  HTTP2_HEADER_PATH
} = http2.constants

const key = fs.readFileSync(path.resolve(__dirname, '../ssl/key.pem'))
const cert = fs.readFileSync(path.resolve(__dirname, '../ssl/cert.pem'))
const dependenciesFile = fs.readFileSync(path.resolve(__dirname, './dependencies.json'))
const dependenciesConfig = JSON.parse(dependenciesFile)

const publicFiles = getFiles(path.resolve(__dirname, '../public/'))

function push (stream, path) {
  const file = publicFiles.get(path)

  if (!file) {
    return
  }

  stream.pushStream({ [HTTP2_HEADER_PATH]: path }, (pushStream) => {
    pushStream.respondWithFD(file.fileDescriptor, file.headers)
  })
}

function pushDependencies(stream, reqPath) {
  const dependencies = dependenciesConfig[reqPath] || []

  dependencies.forEach(dependency => {
    push(stream, dependency)
    pushDependencies(stream, dependency)
  })
}

const handler = (req, res) => {
  const path = req.headers[HTTP2_HEADER_PATH]
  const reqPath = path === '/' ? '/index.html' : path
  const file = publicFiles.get(reqPath)

  if (!file) {
    res.statusCode = 404
    res.end()
    return
  }

  pushDependencies(res.stream, reqPath)

  res.stream.respondWithFD(file.fileDescriptor, file.headers)
}

const server = http2.createSecureServer({ cert, key }, handler)

server.listen(3000, () => {
  const { address, port } = server.address()
  console.log(`Server listening at ${address}:${port}`)
})
