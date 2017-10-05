const fs = require('fs')
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

const server = https.createServer({ cert, key }, handler)

server.listen(process.env.PORT || 3002, () => {
  const { address, port } = server.address()
  console.log(`Server listening at ${address}:${port}`)
})
