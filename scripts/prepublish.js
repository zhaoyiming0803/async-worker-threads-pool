const fs = require('fs')

const { getArgsFromTerminal } = require('./utils')

const pkg = require('../package.json')

pkg.version = getArgsFromTerminal('publish_version')

const content = JSON.stringify(pkg, null, 2)

fs.writeFileSync('./package.json', content, 'utf8')
