import fs from 'fs'
import http from 'http'
import path from 'path'

const handler = (req, res) => {

}

const server = http.createServer(handler)

server.listen(3000, () => {
  const { address, port } = server
  console.log(`Server listening at ${address}:${port}`)
})
