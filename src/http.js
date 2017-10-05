const fs = require('fs')
const http = require('http')
const path = require('path')

const handler = (req, res) => {

}

const server = http.createServer(handler)

server.listen(3000, () => {
  const { address, port } = server
  console.log(`Server listening at ${address}:${port}`)
})
