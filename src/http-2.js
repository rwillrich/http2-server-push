const fs = require('fs')
const http2 = require('http2')
const path = require('path')

const getFiles = require('./get-files')

const {
  HTTP2_HEADER_PATH
} = http2.constants

const key = fs.readFileSync(path.resolve(__dirname, '../ssl/key.pem'))
const cert = fs.readFileSync(path.resolve(__dirname, '../ssl/cert.pem'))

const publicFiles = getFiles(path.resolve(__dirname, '../public/'))

const handler = (req, res) => {
  const path = req.headers[HTTP2_HEADER_PATH]
  const reqPath = path === '/' ? '/index.html' : path
  const file = publicFiles.get(reqPath)

  if (!file) {
    res.statusCode = 404
    res.end()
    return
  }

  res.stream.respondWithFD(file.fileDescriptor, file.headers)
}

const server = http2.createSecureServer({ cert, key }, handler)

server.listen(3002, () => {
  const { address, port } = server.address()
  console.log(`HTTP/2 server listening at ${address}:${port}`)
})
