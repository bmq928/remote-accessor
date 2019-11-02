import React, { useGlobal } from 'reactn'
import Spinner from '../Spinner'

export default function LoadingContainer() {
  const [loading] = useGlobal('loading')
  return (
    <div className="LoadingContainer">
      {loading && <Spinner overlay />}
    </div>
  )
}