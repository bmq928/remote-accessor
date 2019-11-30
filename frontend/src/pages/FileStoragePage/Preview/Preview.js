import React from 'react'
import { useGlobal } from 'reactn'
import ReactModal from 'react-modal'

import TextPreview from './TextPreview'
import './Preview.scss'

ReactModal.setAppElement('.App')
export default function Preview() {
  const [previewing, setPreviewing] = useGlobal('previewing')
  const [previewContent] = useGlobal('previewContent')

  function getModalClass() {
    const baseClass = 'Preview modal'
    const modalStatusClass = previewing ? 'is-active' : ''

    return `${baseClass} ${modalStatusClass}`
  }

  return (
    <div className={getModalClass()}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <TextPreview content={previewContent} />
      </div>
      <button
        type="button"
        className="modal-close is-large"
        aria-label="close"
        onClick={() => setPreviewing(false)}
      ></button>
    </div>
  )
}
