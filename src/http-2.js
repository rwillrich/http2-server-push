const fs = require('fs')
const http2 = require('http2')
const path = require('path')

const getFiles = require('./get-files')

const key = fs.readFileSync(path.resolve(__dirname, '../ssl/key.pem'))
const cert = fs.readFileSync(path.resolve(__dirname, '../ssl/cert.pem'))

const publicFiles = getFiles(path.resolve(__dirname, '../public/'))

function push (stream, path) {
  const file = publicFiles.get(path)

  if (!file) {
    return
  }

  stream.pushStream({ [htt2.constants.HTTP2_HEADER_PATH]: path }, (pushStream) => {
    pushStream.respondWithFD(file.fileDescriptor, file.headers)
  })
}

const handler = (req, res) => {
  const reqPath = req.path === '/' ? '/index.html' : req.path
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
