import React, { Suspense } from 'react'
import ProgressBar from '../ProgressBar'

export default function LazyWrapper(Component) {
  return props => (
    <Suspense fallback={<ProgressBar />}>
      <Component {...props} />
    </Suspense>
  )
}