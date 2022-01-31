const fs = require('fs')
const chalk = require('chalk')
const execa = require('execa')

const { getArgsFromTerminal } = require('./utils')
const step = msg => console.log(chalk.cyan(msg))
const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', ...opts })

readyGo()

function updateVersion (targetVersion) {
  const files = ['package.json', 'package-lock.json']

  files.forEach(file => {
    const pkg = require(`../${file}`)
    pkg.version = targetVersion
    
    const content = JSON.stringify(pkg, null, 2)
    fs.writeFileSync(`./${file}`, content, 'utf8')
  })
}

async function readyGo () {
  const targetVersion = getArgsFromTerminal('target_version')

  updateVersion(targetVersion)

  step('\nCommitting changes...')
  await run('git', ['add', '-A'])
  await run('git', ['commit', '-m', `release: v${targetVersion}`])
  
  step('\nPushing to GitHub...')
  await run('git', ['tag', `v${targetVersion}`])
  await run('git', ['push', 'origin', `refs/tags/v${targetVersion}`])
  await run('git', ['push'])
}
