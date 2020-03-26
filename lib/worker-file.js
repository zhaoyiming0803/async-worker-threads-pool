const { parentPort } = require('worker_threads')

parentPort.on('message', ({ fn, workerData, threadId }) => {
  parentPort.postMessage({
    result: eval(`(${fn})(${workerData})`),
    threadId
  })
})
