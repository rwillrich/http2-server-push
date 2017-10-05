import fs from 'fs'
import http2 from 'http2'
import path from 'path'

const key = fs.readFileSync('../ssl/key.pem')
const cert = fs.readFileSync('../ssl/cert.pem')

const push = (stream, filePath) {

}

const handler = (req, res) => {

}

const server = http2.createSecureServer({ cert, key }, handler)

server.listen(3000, () => {
  const { address, port } = server
  console.log(`Server listening at ${address}:${port}`)
})
