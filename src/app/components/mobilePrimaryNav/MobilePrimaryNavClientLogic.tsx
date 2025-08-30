'use client'

type Props = PropsWithChildren

export const mobilePrimaryNavId = 'primaryNav'

import { useWindowWidth } from '../header/useWindowWidth'
import './mobilePrimaryNav.css'
import { useEffect, type PropsWithChildren } from 'react'

export function MobilePrimaryNavClientLogic(props: Props) {
  const windowWidth = useWindowWidth()

  useEffect(() => {
    // TODO: retrieve the resolution from a CSS var
    if (windowWidth < 1024) return

    const dialog = document.querySelector('dialog')!

    if (!dialog.open) return

    // TODO: test this behavior
    dialog.close()
  }, [windowWidth])

  useEffect(() => {
    const dialog = document.querySelector('dialog')!
    const dialogContainer = document.querySelector('#dialog-container')!
    const openNavigationMenuButton = document.querySelector('#openNavigationMenuButton')!
    const closeButton = document.querySelector('#closeButton')!

    // Open the dialog when the button is clicked
    openNavigationMenuButton.addEventListener('click', () => {
      dialog.showModal()
    })

    // Close the dialog when the close button is clicked
    closeButton.addEventListener('click', () => {
      dialog.close()
    })

    // Close on outside click
    document.addEventListener('click', (event) => {
      if (
        event.target instanceof Node &&
        !dialogContainer.contains(event.target) &&
        dialog.open &&
        !openNavigationMenuButton.contains(event.target)
      ) {
        dialog.close()

        // document.body.style.overflow = 'auto'
      }
    })
  }, [])

  return props.children
}
