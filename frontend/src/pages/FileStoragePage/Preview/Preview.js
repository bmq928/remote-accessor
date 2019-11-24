import React from 'react'
import { useGlobal } from 'reactn'
import ReactModal from 'react-modal'

import TextPreview from './TextPreview'

ReactModal.setAppElement('.App')
export default function Preview() {
  const [previewing] = useGlobal('previewing')
  const [previewContent] = useGlobal('previewContent')
  const style = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderColor: '#81e6d9',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      width: '40%',
      minHeight: '300px', 
      minWidth: '925px'
    },
  }

  return (
    <ReactModal isOpen={previewing} style={style}>
      <TextPreview content={previewContent} />
    </ReactModal>
  )
}
