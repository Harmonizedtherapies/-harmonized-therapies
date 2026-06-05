'use client'
import { useEffect } from 'react'

export default function BeholdFeed() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://w.behold.so/widget.js'
    script.type = 'module'
    script.defer = true
    document.head.appendChild(script)
    return () => {
      if (document.head.contains(script)) document.head.removeChild(script)
    }
  }, [])

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: '<behold-widget feed-id="wyuJL"></behold-widget>',
      }}
    />
  )
}
