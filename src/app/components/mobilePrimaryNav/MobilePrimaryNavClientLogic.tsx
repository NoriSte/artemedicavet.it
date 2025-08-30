'use client'

type Props = PropsWithChildren

export const mobilePrimaryNavId = 'primaryNav'

import './mobilePrimaryNav.css'
import { useEffect, type PropsWithChildren } from 'react'

export function MobilePrimaryNavClientLogic(props: Props) {
  useEffect(() => {
    const dialog = document.querySelector('dialog')!
    const dialogContainer = document.querySelector('#dialog-container')!
    const showButton = document.querySelector('#showButton')!
    const closeButton = document.querySelector('#closeButton')!

    // Open the dialog when the button is clicked
    showButton.addEventListener('click', () => {
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
        !showButton.contains(event.target)
      ) {
        dialog.close()
        // document.body.style.overflow = 'auto'
      }
    })
  }, [])

  return props.children
}
