const fs = require('fs')
const http = require('http')
const https = require('https')
const path = require('path')
const url = require('url')

const getFiles = require('./get-files')
const dependenciesConfig = require('./dependencies.json')

const key = fs.readFileSync(path.resolve(__dirname, '../ssl/key.pem'))
const cert = fs.readFileSync(path.resolve(__dirname, '../ssl/cert.pem'))

const publicDir = path.resolve(__dirname, '../public/')
const publicFiles = getFiles(publicDir)

const handler = (req, res) => {
  const location = url.parse(req.url)
  const reqPath = location.path === '/' ? '/index.html' : location.path
  const file = publicFiles.get(reqPath)

  if (!file) {
    res.statusCode = 404
    res.end()
    return
  }

  res.writeHead(200, file.headers)
  fs.createReadStream(path.join(publicDir, reqPath)).pipe(res)
}

const httpServer = http.createServer(handler)

httpServer.listen(3000, () => {
  const { address, port } = httpServer.address()
  console.log(`HTTP server listening at ${address}:${port}`)
})

const httpsServer = https.createServer({ cert, key }, handler)

httpsServer.listen(3001, () => {
  const { address, port } = httpsServer.address()
  console.log(`HTTPS server listening at ${address}:${port}`)
})
