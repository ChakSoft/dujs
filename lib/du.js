import { spawn } from 'child_process'
import * as nPath from 'path'

const du = (path, {
  depth = 1,
  withFiles = false,
}) => {
  return new Promise((resolve) => {
    const args = [`-d${depth}`, '--apparent-size']
    if (withFiles) {
      args.push('-a')
    }
    args.push(path)

    const cmd = spawn('du', args)
    let lines = ''
    let errors = ''
    cmd.stdout
      .on('data', (chunk) => {
        lines += chunk.toString()
      })
    cmd.stderr
      .on('data', (chunk) => {
        errors += chunk.toString()
      })
    cmd.on('exit', () => {
      return resolve({
        lines : lines.split('\n'),
        errors : errors.split('\n'),
      })
    })
  })
}

const humanSize = (size) => {
  if (size < 1024) {
    return `${size} KiB.`
  }
  if (size < 1048576) {
    return `${(size / 1024).toFixed(2)} MiB.`
  }
  if (size < (1024 * 1048576)) {
    return `${(size / 1048576).toFixed(2)} GiB.`
  }
  if (size < (1048576 * 1048576)) {
    return `${(size / (1024 * 1048576)).toFixed(2)} TiB.`
  }
  return `${size} B.`
}

const boldify = (str) => {
  return `\x1b[1m${str}\x1b[0m`
}

export default ({
  path = '.',
  depth = 1,
  human = true,
  reverse = false,
  withFiles = false,
}) => {
  const absolutePath = nPath.resolve(path)
  return du(absolutePath, {
    depth,
    withFiles,
  }).then(({ lines }) => {
    const goodLines = lines.filter((line) => line.length > 0 && line.indexOf('\t') !== -1)
    const sortedPaths = goodLines
      .map((line) => {
        const [size, folderPath] = line.split('\t')
        const intSize = parseInt(size, 10)
        return {
          size : intSize,
          path : folderPath,
        }
      })
      .sort((a, b) => {
        if (!reverse) {
          if (a.size > b.size) {
            return -1
          }
          if (a.size < b.size) {
            return 1
          }
        }
        if (a.size < b.size) {
          return -1
        }
        if (a.size > b.size) {
          return 1
        }
        return 0
      })
      .map((data, index) => {
        const isBold = (index === 0 && !reverse) || (reverse && index === goodLines.length - 1)
        const p = isBold ? boldify(data.path) : data.path
        let s = human ? humanSize(data.size) : data.size
        if (isBold) {
          s = boldify(s)
        }
        return [p, s]
      })
    return sortedPaths
  })
}
