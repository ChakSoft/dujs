#!/usr/bin/env node

const command = require('commander')
const ora = require('ora')
const table = require('table')

const {
  version,
  description,
} = require('../package.json')
const du = require('../lib/du')

command
  .version(version)
  .description(description)
  .option('-d, --depth [depth]', 'Depth of the search', 1)
  .option('-n, --non-human', 'Display sizes as bytes for non-humans')
  .option('-r, --reverse', 'Reverse sorting')
  .option('-f, --files', 'Display files in the list')
  .parse(process.argv)

const spinner = ora('Computing sizes...').start()
du({
  path : command.args[0],
  depth : parseInt(command.depth, 10),
  human : !command.nonHuman,
  reverse : command.reverse,
  withFiles : command.files,
}).then((list) => {
  spinner.stop()
  process.stdout.write(table.table(list, {
    columns : {
      0 : { alignment : 'left' },
      1 : { alignment : 'right' },
    },
  }))
  process.stdout.write('\n')
  spinner.succeed(`Computed ${list.length} items.`)
}).catch((err) => {
  spinner.fail(err.message)
})
