import { useEffect, useState, useRef, useCallback } from 'react'

const useScrollFadeIn = () => {
  const dom = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(([entry]: IntersectionObserverEntry[]) => {
    const { current } = dom
    if (entry.isIntersecting && current) {
    }
  }, [])

  useEffect(() => {
    let observer: IntersectionObserver
    const { current } = dom

    if (current) {
      observer = new IntersectionObserver(handleScroll, { threshold: 0.7 })
      observer.observe(current)

      return () => observer && observer.disconnect()
    }
  }, [handleScroll])

  return {
    ref: dom,
    style: {
      opacity: 0,
      transform: 'translate3d(0, 50%, 0)',
    },
  }
}

export default useScrollFadeIn
