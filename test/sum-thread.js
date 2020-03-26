const {
  parentPort, workerData
} = require('worker_threads')

function sum (value) {
  if (value === 0) {
    return 0
  }
  return value + sum(value - 1)
}

// parentPort.postMessage(sum(workerData))

parentPort.on('message', workerData => {
  const res = sum(workerData)
  // console.log('workerData: ', workerData)
  // console.log('res: ', res)
  parentPort.postMessage(res)
})