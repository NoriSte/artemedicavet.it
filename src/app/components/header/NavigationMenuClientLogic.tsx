'use client'

import { useEffect, type PropsWithChildren } from 'react'
import { useWindowWidth } from './useWindowWidth'
import { navigationMenuToggleId } from './NavigationMenuToggle'
import { getPrimaryNavElement } from '../primaryNav/PrimaryNav'

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
    const primaryNavElement = getPrimaryNavElement()
    console.log({ primaryNavElement })

    function openNavigation() {
      navigationMenuToggle.setAttribute('aria-expanded', 'true')
      primaryNavElement.classList.remove('hidden')
    }

    function closeNavigation() {
      navigationMenuToggle.setAttribute('aria-expanded', 'false')
      primaryNavElement.classList.add('hidden')
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
