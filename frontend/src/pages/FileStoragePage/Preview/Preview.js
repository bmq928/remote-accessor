import React from 'react'
import { useGlobal } from 'reactn'

import TextPreview from './TextPreview'
import ImgPreview from './ImgPreview'
import './Preview.scss'

export default function Preview() {
  const [previewing, setPreviewing] = useGlobal('previewing')
  const [previewContent] = useGlobal('previewContent')
  const [previewType] = useGlobal('previewType')
  const [previewFileExt] = useGlobal('previewFileExt')

  function getModalClass() {
    const baseClass = 'Preview modal'
    const modalStatusClass = previewing ? 'is-active' : ''

    return `${baseClass} ${modalStatusClass}`
  }

  function isTextType() {
    return previewType === 'text'
  }

  function isImgType() {
    if (!previewType === 'base64') return false
    const imgExtList = ['.png', '.jpeg', '.jpg']
    return imgExtList.includes(previewFileExt)
  }

  return (
    <div className={getModalClass()}>
      <div className="modal-background"></div>
      <div className="modal-content">
        {isTextType() && <TextPreview content={previewContent} />}
        {isImgType() && <ImgPreview base64src={previewContent} />}
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
