const http = require('http')
const fs = require('fs')
const path = require('path')
const util = require('util')

const readFileAsync = util.promisify(fs.readFile)

const port = process.env.PORT || 5000

/**
 * 1. Con callback
 */

// function requestServer (req, res) {
//   fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
//     if (err) throw err
//     res.setHeader('content-type', 'text/html')
//     res.statusCode = 200
//     res.end(data, 'utf-8')
//   })
// }

/**
 * 2. Con Promesas con then - catch
 *
 * @param {http.ClientRequest} req
 * @param {http.clientResponse} res
 */
// function requestServer (req, res) {
//   readFileAsync(path.join(__dirname, 'index.html'))
//     .then((data) => {
//       res.setHeader('content-type', 'text/html')
//       res.statusCode = 200
//       res.end(data, 'utf-8')
//     }).catch((error) => {
//       throw error
//     })
// }

/**
 * 3. Con Promesas con async - await
 *
 * @param {http.ClientRequest} req
 * @param {http.clientResponse} res
 */
async function requestServer (req, res) {
  try {
    const data = await readFileAsync(path.join(__dirname, 'index.html'))
    res.setHeader('content-type', 'text/html')
    res.statusCode = 200
    res.end(data, 'utf-8')
  } catch (error) {
    return error
  }
}

const server = http.createServer()

server.on('request', requestServer)
server.on('listening', () => {
  console.log(`server listening in port ${port}`)
})

server.listen(port)
