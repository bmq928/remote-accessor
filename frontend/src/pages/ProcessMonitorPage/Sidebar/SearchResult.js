import React from 'react'
import { useGlobal } from 'reactn'
import PropTypes from 'prop-types'

export default function SearchResult({ searchText }) {
  const [processes] = useGlobal('processes')

  const matchedProcesses = processes.filter(
    p => p.processName && p.processName.startsWith(searchText)
  )

  return (
    <aside className="menu">
      <p className="menu-label">Search Result</p>
      <ul className="menu-list">
        {matchedProcesses.map(p => (
          <li key={p.id}>
            <a href={`#${p.id}`}>{p.processName}</a>
          </li>
        ))}
      </ul>
    </aside>
  )
}

SearchResult.propTypes = {
  searchText: PropTypes.string.isRequired,
}
