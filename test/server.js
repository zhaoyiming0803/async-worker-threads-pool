// nodejs 本身的异步非阻塞 IO 已经能很好的支持 IO 密集型任务了
// child thread 一般用在计算密集型任务中

const http = require('http')

const Pool = require(__dirname + '/../index')
const pool = new Pool(2)

function sum (value) {
  if (value === 0) {
    return 0
  }
  return value + sum(value - 1)
}

const server = http.createServer((req, res) => {
  const query = {}
  req.url.replace(/([a-z]+)=(\w+)/g, ($0, $1, $2) => {
    query[ $1 ] = $2
  })

  pool
    .queueTask(sum, +query.value)
    .then(({result, threadId}) => {
      console.log(result, threadId)
      res.writeHead(200)
      res.end(`${query.callback}(${result})`)
    })
    .catch(error => {
      console.log(error)
      res.writeHead(500)
      res.end(`service error`)
    })
})

server.listen(3001, () => console.log('server listen at port 3001 successfully'))