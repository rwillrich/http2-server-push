const fs = require('fs')
const http = require('http')
const path = require('path')
const url = require('url')

const getFiles = require('./get-files')
const dependenciesConfig = require('./dependencies.json')

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

const server = http.createServer(handler)

server.listen(3000, () => {
  const { address, port } = server.address()
  console.log(`Server listening at ${address}:${port}`)
})
