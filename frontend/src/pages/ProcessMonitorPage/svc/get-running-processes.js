import axios from 'axios'

import { constants } from '../vendors'

export default async function getRunnintProcesses() {
  const url = `${constants.AGENT_HOST}/process`
  const resp = await axios.get(url)
  const runningProcesses = resp.data
  return runningProcesses
}
