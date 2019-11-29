import React from 'react'
import { LazyLog } from 'react-lazylog'

import './TextPreview.scss'

export default function Preview({ content }) {
  // TODO: fix horizontal scroll

  return (
    <div className="TextPreview" style={{ height: 300, width: 900 }}>
      <LazyLog
        extraLines={0}
        text={`${content}
        `}
        containerStyle={{
          backgroundColor: 'white',
          color: 'black',
        }}
      />
    </div>
  )
}
