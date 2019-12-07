import React, { useState, createRef } from 'react'

import { constants } from './vendors'
import './ScreenRecorderPage.scss'

export default function ScreenRecorderPage() {
  const [isPreviewing, setIsPreviewing] = useState(false)
  const imgRef = createRef()

  const streamVideoSrc = `${constants.AGENT_HOST}/screen-recorder`

  function closeStreaming() {
    setIsPreviewing(false)
    if (imgRef.current) {
      imgRef.current.src = ''
    }
  }

  return (
    <div className="ScreenRecorderPage">
      <button
        className="button is-primary is-outlined centered"
        type="button"
        onClick={() => setIsPreviewing(!isPreviewing)}
      >
        See what person do on computer
      </button>
      {isPreviewing && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-content">
            <p className="image is-4by3">
              {/* <iframe src={streamVideoSrc} title="webcam" height="400" width="600" /> */}
              <img ref={imgRef} src={streamVideoSrc} alt="" />
            </p>
          </div>
          <button
            type="button"
            className="modal-close is-large"
            aria-label="close"
            onClick={() => closeStreaming()}
          ></button>
        </div>
      )}
    </div>
  )
}
