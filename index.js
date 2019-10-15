const http = require('http')

const port = process.env.PORT || 5000

function requestServer (req, res) {
  res.setHeader('content-type', 'application/json')
  res.statusCode = 200
  res.end(JSON.stringify({
    name: 'Node.js Server'
  }))
}

const server = http.createServer()

server.on('request', requestServer)
server.on('listening', () => {
  console.log(`server listening in port ${port}`)
})

server.listen(port)
