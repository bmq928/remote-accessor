import React from 'react'
import PropTypes from 'prop-types'

import './TextPreview.scss'

export default function TextPreview({ content }) {
  return <div className="TextPreview">{content}</div>
}

TextPreview.propTypes = {
  content: PropTypes.string.isRequired
}