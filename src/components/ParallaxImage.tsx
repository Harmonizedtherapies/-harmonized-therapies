'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

interface ParallaxImageProps {
  src: string
  alt: string
  priority?: boolean
  quality?: number
  objectPosition?: string
}

export default function ParallaxImage({
  src,
  alt,
  priority = false,
  quality = 90,
  objectPosition = 'center',
}: ParallaxImageProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  // Image drifts up 20% as section scrolls out — creates depth
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <motion.div ref={ref} className="absolute inset-0 scale-110" style={{ y }}>
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover object-${objectPosition}`}
        priority={priority}
        quality={quality}
        sizes="100vw"
      />
    </motion.div>
  )
}
