import React, { useState } from 'react'
import shortid from 'shortid'

import { constants } from './vendors'
import './SnapshotPage.scss'

export default function SnapshotPage() {
  const [isPreviewing, setIsPreviewing] = useState(false)

  //reload img ervery time rerender
  const snapshotLink = `${constants.AGENT_HOST}/screenshot?a=${Date.now()}`

  return (
    <div className="SnapshotPage">
      <button
        className="button is-primary is-outlined centered"
        type="button"
        onClick={() => setIsPreviewing(!isPreviewing)}
      >
        Click to take a Screenshot
      </button>
      {isPreviewing && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-content">
            <p className="image is-4by3">
              <img key={shortid.generate()} src={snapshotLink} alt="" />
            </p>
          </div>
          <button
            type="button"
            className="modal-close is-large"
            aria-label="close"
            onClick={() => setIsPreviewing(false)}
          ></button>
        </div>
      )}
    </div>
  )
}
