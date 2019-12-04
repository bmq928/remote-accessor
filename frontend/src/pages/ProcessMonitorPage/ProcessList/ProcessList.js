import React, { useEffect } from 'react'
import { useGlobal } from 'reactn'
import _ from 'lodash'
import shortid from 'shortid'

import { svc } from '../vendors'
import ProcessHeaderRow from './ProcessHeaderRow'
import ProcessContentRow from './ProcessContentRow'
import './ProcessList.scss'

export default function ProcessList() {
  const [, setLoading] = useGlobal('loading')
  const [processes, setProcesses] = useGlobal('processes')

  useEffect(() => {
    setLoading(true)
    svc
      .getRunningProcesses()
      .then(({ command, memory, cpu }) => {
        const runningProcesses = _.zip(command, memory, cpu).map(
          ([processName, memUsage, cpuUsage]) => ({
            processName,
            memUsage,
            cpuUsage,
            id: shortid.generate()
          })
        )
        setProcesses(runningProcesses)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="ProcessList table-container">
      <table className="table is-bordered">
        <thead>
          <ProcessHeaderRow />
        </thead>
        <tbody>
          {processes.map((processInfo, idx) => (
            <ProcessContentRow
              key={processInfo.id}
              $id={processInfo.id}
              idx={idx + 1}
              name={processInfo.processName}
              memUsage={processInfo.memUsage}
              cpuUsage={processInfo.cpuUsage}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
