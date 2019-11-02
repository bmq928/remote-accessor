import React, { useEffect, createRef } from 'react'

import './ProgressBar.scss'

export default function ProgressBar() {
  const ref = createRef()

  useEffect(() => {
    const $this = ref.current
    const setBarLen = len => {
      $this.style.width = `${len}%`
      $this.setAttribute('aria-valuenow', len)
      $this.text = `${len}%`
    }

    let step = 0.5
    let curPercent = 0
    let progress = 0

    const interval = setInterval(() => {
      curPercent += step
      progress =
        Math.round((Math.atan(curPercent) / (Math.PI / 2)) * 100 * 1000) / 1000
      setBarLen(progress)
      if (progress >= 100) {
        clearInterval(interval)
      } else if (progress >= 70) {
        step = 0.1
      }
    }, 100)

    return () => {
      setBarLen(100)
      clearInterval(interval)
    }
  })

  return (
    <div
      ref={ref}
      className="ProgressBar waiting"
      style={{ width: '34%' }}
    ></div>
  )
}
