import React from 'react'
import { useGlobal } from 'reactn'
import 'react-pdf/dist/Page/AnnotationLayer.css'

import TextPreview from './TextPreview'
import ImgPreview from './ImgPreview'
import PdfPreview from './PdfPreview'
import './Preview.scss'


export default function Preview() {
  const [previewing, setPreviewing] = useGlobal('previewing')
  const [previewContent] = useGlobal('previewContent')
  const [previewType] = useGlobal('previewType')
  const [previewFileExt] = useGlobal('previewFileExt')

  function toBase64(str) {
    return `data:image/png;base64, ${str}`
  }

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

  function isPdfType() {
    return previewType === 'base64' && previewFileExt === '.pdf'
  }

  return (
    <div className={getModalClass()}>
      <div className="modal-background"></div>
      <div className="modal-content">
        {isTextType() && <TextPreview content={previewContent} />}
        {isImgType() && <ImgPreview base64src={toBase64(previewContent)} />}
        {isPdfType() && <PdfPreview base64src={toBase64(previewContent)} />}
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
