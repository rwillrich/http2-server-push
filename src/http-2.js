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

function push (stream, path) {
  const file = publicFiles.get(path)

  if (!file) {
    return
  }

  stream.pushStream({ [HTTP2_HEADER_PATH]: path }, (pushStream) => {
    pushStream.respondWithFD(file.fileDescriptor, file.headers)
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

  // Push Stream
  // if (reqPath === '/index.html') {
  //   push(res.stream, '/bundle1.js')
  //   push(res.stream, '/bundle2.js')
  // }

  res.stream.respondWithFD(file.fileDescriptor, file.headers)
}

const server = http2.createSecureServer({ cert, key }, handler)

server.listen(3000, () => {
  const { address, port } = server.address()
  console.log(`Server listening at ${address}:${port}`)
})
