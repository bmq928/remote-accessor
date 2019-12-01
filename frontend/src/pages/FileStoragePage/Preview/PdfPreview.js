import React, { useState } from 'react'
import PropTypes from 'prop-types'
// import {Document, Page} from 'react-pdf'

import { Document, Page } from 'react-pdf/dist/entry.webpack'

export default function PdfPreview({ base64src }) {
  const [numPages, setNumPages] = useState(0)

  return (
    <Document
      file={base64src}
      onLoadSuccess={option => setNumPages(option.numPages)}
    >
      {new Array(numPages).fill(null).map((val, idx) => (
        <Page key={`page_${idx + 1}`} pageNumber={idx + 1} />
      ))}
    </Document>
  )
}

PdfPreview.propTypes = {
  base64src: PropTypes.string.isRequired,
}
