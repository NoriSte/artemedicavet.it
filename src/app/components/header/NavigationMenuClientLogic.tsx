'use client'

import { useEffect, type PropsWithChildren } from 'react'
import { useWindowWidth } from './useWindowWidth'
import { navigationMenuToggleId } from './NavigationMenuToggle'

type Props = PropsWithChildren

function getNavigationMenuToggle() {
  const maybeNavigationMenuToggle = document.getElementById(navigationMenuToggleId)
  if (!maybeNavigationMenuToggle)
    throw new Error('getNavigationMenuToggle is not executed in browser environment')

  return maybeNavigationMenuToggle
}

export function NavigationMenuClientLogic(props: Props) {
  const windowWidth = useWindowWidth()

  useEffect(() => {
    const navigationMenuToggle = getNavigationMenuToggle()

    function openNavigation() {
      navigationMenuToggle.setAttribute('aria-expanded', 'true')
    }

    function closeNavigation() {
      navigationMenuToggle.setAttribute('aria-expanded', 'false')
    }

    function toggleNavigation() {
      const open = navigationMenuToggle.getAttribute('aria-expanded')

      if (open === 'false') openNavigation()
      else closeNavigation()
    }

    navigationMenuToggle.addEventListener('click', toggleNavigation)
  }, [])

  useEffect(() => {
    // TODO: retrieve the resolution from a CSS var
    if (windowWidth < 1024) return

    const navigationMenuToggle = getNavigationMenuToggle()
    navigationMenuToggle.setAttribute('aria-expanded', 'false')
  }, [windowWidth])
  return props.children
}
