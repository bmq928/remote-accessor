import React from 'react'
import PropTypes from 'prop-types'

export default function ProcessContentRow({ name, cpuUsage, memUsage, idx, $id }) {
  return (
    <tr id={$id}>
      <td>{idx}</td>
      <td>{name}</td>
      <td>{cpuUsage}</td>
      <td>{memUsage}</td>
    </tr>
  )
}

ProcessContentRow.propTypes = {
  name: PropTypes.string.isRequired,
  cpuUsage: PropTypes.string.isRequired,
  memUsage: PropTypes.string.isRequired,
  idx: PropTypes.number.isRequired,
  $id: PropTypes.string.isRequired,
}
