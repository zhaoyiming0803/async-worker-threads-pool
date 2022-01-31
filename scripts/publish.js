const fs = require('fs')
const chalk = require('chalk')
const execa = require('execa')
const { getArgsFromTerminal } = require('./utils')
const step = msg => console.log(chalk.cyan(msg))
const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', ...opts })

readyGo()

async function readyGo () {
  const pkg = require('../package.json')

  const targetVersion = getArgsFromTerminal('target_version')

  pkg.version = targetVersion

  const content = JSON.stringify(pkg, null, 2)

  fs.writeFileSync('./package.json', content, 'utf8')

  step('\nCommitting changes...')
  await run('git', ['add', '-A'])
  await run('git', ['commit', '-m', `release: v${targetVersion}`])
  
  step('\nPushing to GitHub...')
  await run('git', ['tag', `v${targetVersion}`])
  await run('git', ['push', 'origin', `refs/tags/v${targetVersion}`])
  await run('git', ['push'])
}
