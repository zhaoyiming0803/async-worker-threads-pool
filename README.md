# async-worker-threads-pool
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

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
npm version 1.0.16-beta2

npm version preminor
npm version minor

npm version premajor
npm version major
```
## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://jakebolam.com"><img src="https://avatars.githubusercontent.com/u/3534236?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jake Bolam</b></sub></a><br /><a href="#infra-jakebolam" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/zhaoyiming0803/async-worker-threads-pool/commits?author=jakebolam" title="Tests">⚠️</a> <a href="https://github.com/zhaoyiming0803/async-worker-threads-pool/commits?author=jakebolam" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!