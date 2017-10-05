const fs = require('fs')
const http = require('http')
const path = require('path')

const indexPath = path.resolve(__dirname, '../public/index.html')

const handler = (req, res) => {
  fs.readFile(indexPath, function(err, data) {
    if (!data) {
      res.writeHead(500)
    } else {
      res.setHeader('Content-Type', 'text/html')
      res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length })
      res.write(data)
    }

    res.end()
  })
}

const server = http.createServer(handler)

server.listen(3000, () => {
  const { address, port } = server
  console.log(`Server listening at ${address}:${port}`)
})
