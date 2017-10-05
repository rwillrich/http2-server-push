const fs = require('fs')
const path = require('path')
const mime = require('mime')

const getFiles = baseDir => {
  const files = new Map()

  fs.readdirSync(baseDir).forEach((fileName) => {
    const filePath = path.join(baseDir, fileName)
    const fileDescriptor = fs.openSync(filePath, 'r')
    const stat = fs.fstatSync(fileDescriptor)
    const contentType = mime.getType(filePath)

    files.set(`/${fileName}`, {
      fileDescriptor,
      headers: {
        'content-length': stat.size,
        'last-modified': stat.mtime.toUTCString(),
        'content-type': contentType
      }
    })
  })

  return files
}

module.exports = getFiles
