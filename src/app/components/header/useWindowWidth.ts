import { useSyncExternalStore } from 'react'

type WindowWidth = number

function subscribe(callback: () => void) {
  window.addEventListener('resize', callback)

  return () => {
    window.removeEventListener('resize', callback)
  }
}

export function useWindowWidth() {
  return useSyncExternalStore<WindowWidth>(
    subscribe,
    () => window.innerWidth,
    () => -1
  )
}
