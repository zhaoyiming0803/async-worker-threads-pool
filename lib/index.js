/**
 * worker threads pool of node.js
 * reference: https://github.com/shahidcodes/threadifier-node
 */
const { Worker } = require('worker_threads')

class Pool {
  constructor (max) {
    this._max = max || 1
    this._workerFile = `${ __dirname }/worker-file.js`
    this._workers = {}
    this._activeWorkers = {}
    this._queue = []
    this._init()
  }

  _init () {
    Array.from({ length: this._max }).forEach((v, k) => {
      this._workers[ k ] = new Worker(this._workerFile)
      this._activeWorkers[ k ] = false
    })
  }

  _getInactiveWorker () {
    for (let i = 0; i < this._max; i += 1) {
      if (!this._activeWorkers[ i ]) return i
    }
    return -1
  }

  queueTask (fn, workerData) {
    return new Promise((resolve, reject) => {
      const workerId = this._getInactiveWorker()
      const task = {
        fn: fn.toString(),
        workerData,
        callback: (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      }
      if (workerId === -1) {
        console.log(`task queued on will be exec when worker is available`)
        this._queue.push(task)
      } else {
        this._runWorker(workerId, task)
      }
    })
  }

  _runWorker (workerId, task) {
    const worker = this._workers[ workerId ]
    this._activeWorkers[ workerId ] = true

    worker.on('message', result => {
      task.callback(null, result)
      this._cleanup(worker, workerId)
    })

    worker.on('error', error => {
      task.callback(error)
      this._cleanup(worker, workerId)
    })

    worker.on('exit', () => {
      console.log(`worker ${ workerId } is exiting`)
    })

    worker.postMessage({
      fn: task.fn,
      workerData: task.workerData,
      threadId: worker.threadId
    })
  }

  _cleanup (worker, workerId) {
    this._activeWorkers[ workerId ] = false
    worker.removeAllListeners('message')
    worker.removeAllListeners('error')
    worker.removeAllListeners('exit')
    const task = this._queue.shift()
    if (task) {
      this._runWorker(workerId, task)
    }
  }
}

module.exports = Pool