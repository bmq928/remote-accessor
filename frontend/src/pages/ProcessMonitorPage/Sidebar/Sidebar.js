import React, { useState } from 'react'

import SearchResult from './SearchResult'
import './Sidebar.scss'

export default function Sidebar() {
  const [searchText, setSearchText] = useState('')

  return (
    <div className="Sidebar">
      <input
        className="input is-small"
        type="text"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        placeholder="Search Process Name"
        style={{ borderRight: '0' }}
      ></input>
      <SearchResult searchText={searchText} />
    </div>
  )
}
