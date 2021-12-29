const log = require('node-console-colors')

console.log(log.set('fg_blue', `this is release.js `))

try {
  fn()
} catch (e) {
  console.log('catch error: ', e)
}
