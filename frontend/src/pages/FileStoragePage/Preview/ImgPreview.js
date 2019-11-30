import React from 'react'
import PropTypes from 'prop-types'

export default function ImgPreview({base64src}) {
  return (
    <p className="image is-4by3">
      <img src={`data:image/png;base64, ${base64src}`} alt="" />
    </p>
  )
}

ImgPreview.propTypes = {
  base64src: PropTypes.string.isRequired
}