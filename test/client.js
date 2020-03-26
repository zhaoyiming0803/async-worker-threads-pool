const http = require('http')
const fs = require('fs')
const template = fs.readFileSync(__dirname + '/client.html')

const client = http.createServer((req, res) => {
  res.writeHead(200)
  res.end(template)
})

client.listen(3000, () => console.log('client listen at port 3000 successfully'))