const execa = require('execa')
const os = require('os-utils')
const config = require('config')

const { initLogger } = require('../../../shares/logging')

const isProductionEnv = config.get('production')
const logFolder = config.get('logFolder')
const moduleName = config.get('moduleName')
const logger = initLogger(isProductionEnv, logFolder, moduleName)

module.exports.poll = async function poll() {
  try {
    const commandArgs = 'ps -ewwwo %cpu,%mem,comm'
    const { stdout, stderr } = await execa.command(commandArgs)

    if (stderr) throw new Error(stderr)

    const [_, ...lines] = stdout.split('\n')
    const initialVal = {
      cpu: [],
      count: [],
      memory: [],
      command: [],
    }

    const result = lines
      .map(l => {
        // remove unecessary symbol
        const line = l.trim().replace('  ', ' ')
        const [cpu, memory, ...commandSplited] = line.split(' ')
        const command = commandSplited.join(' ')
        const count = 1

        return [parseFloat(cpu), parseFloat(memory), command, parseInt(count)]
      })
      .filter((val, i, arr) => {
        // have same command value
        const preElementIndex = arr.findIndex(el => el[2] === val[2])

        //this element is the first element
        if (preElementIndex === i) return true

        // increase count
        ++arr[preElementIndex][3]

        //increase cpu
        arr[preElementIndex][0] += val[0]
        return false
      })
      .reduce((acc, cur) => {
        const [cpu, memory, command, count] = cur

        acc.cpu.push(parseFloat(cpu) / os.cpuCount())
        acc.count.push(count)
        acc.memory.push(parseFloat(memory) / os.totalmem())
        acc.command.push(command)

        return acc
      }, initialVal)

    return result
  } catch (e) {
    logger.error(e)
  }
}
