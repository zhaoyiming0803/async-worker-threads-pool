# async-worker-threads-pool

Work threads pool of node.js, you can use it to create multiple worker threads to handle intensive computing tasks.

async-worker-threads-pool based on worker_threads and promise, easy to handle asynchronous tasks.

## API

### `pool = new Pool([max])`

- max: Maximum number of workers allowed in the pool

### `pool.queueTask(task, workerData)`

returns a Promise

## Get started

### `npm install async-worker-threads-pool --save`

## Usage

``` javascript
const Pool = require('async-worker-threads-pool')
const pool = new Pool(2)

function sum (value) {
  if (value === 0) {
    return 0
  }
  return value + sum(value - 1)
}

let num = 1000

setInterval(() => {
  pool
    .queueTask(sum, num++)
    .then(res => console.log(res))
    .catch(error => console.log(error))
}, 1000)
```

## Examples

Please check the test directory.

``` shell
npm version prepatch
npm version patch
npm version 1.0.16-2

npm version preminor
npm version minor

npm version premajor
npm version major
```