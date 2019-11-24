import React from 'react'
import Loader from 'react-loader-spinner'
import PropTypes from 'prop-types'
import './Spinner.scss'

export default function Spinner({ overlay }) {
  return (
    <div className="Spinner">
      {overlay && <div className="overlay"></div>}
      <Loader type="BallTriangle" color="#81e6d9" height={80} width={80} />
    </div>
  )
}

Spinner.propTypes = {
  overlay: PropTypes.bool.isRequired
}