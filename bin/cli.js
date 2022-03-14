#!/usr/bin/env node

import { readFile } from 'fs/promises'
import { program } from 'commander'
import ora from 'ora'
import { table } from 'table'

import du from '../lib/du.js'

async function readAppMeta () {
  const {
    version,
    description,
  } = JSON.parse((await readFile('./package.json')).toString('utf-8'))
  return {
    version,
    description,
  }
}

const spinner = ora('Computing sizes...')

readAppMeta()
  .then(({
    version,
    description,
  }) => {
    program
      .version(version)
      .description(description)
      .option('-d, --depth [depth]', 'Depth of the search', 1)
      .option('-n, --non-human', 'Display sizes as bytes for non-humans')
      .option('-r, --reverse', 'Reverse sorting')
      .option('-f, --files', 'Display files in the list')
      .parse(process.argv)

    spinner.start()
    const opts = program.opts()
    return du({
      path : program.args[0],
      depth : parseInt(opts.depth, 10),
      human : !opts.nonHuman,
      reverse : opts.reverse,
      withFiles : opts.files,
    })
  })
  .then((list) => {
    spinner.stop()
    process.stdout.write(table(list, {
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
