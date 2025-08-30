'use client'

import Link from 'next/link'

type LinkProps = React.ComponentProps<typeof Link>
type CurrentRoute = LinkProps['href']

type Props = { currentPage?: CurrentRoute }

export const mobilePrimaryNavId = 'primaryNav'

import './mobilePrimaryNav.css'
import { useEffect } from 'react'

export function MobilePrimaryNav(props: Props) {
  const { currentPage } = props

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

  return (
    <>
      <button id="showButton">Show menu</button>`
      <dialog>
        <div id="dialog-container">
          <button id="closeButton">close</button>
          <nav id={mobilePrimaryNavId}>
            <ul>
              <Link
                href="/"
                aria-current={currentPage === '/' ? 'page' : undefined}
                // TODO: check how it's announced by screen readers,
                aria-label="Home page"
              >
                {/* TODO: replace it with the SVG */}
                Home
              </Link>

              <Link
                href="/chi-siamo"
                aria-current={currentPage === '/chi-siamo' ? 'page' : undefined}
              >
                Chi siamo
              </Link>
            </ul>
          </nav>
        </div>
      </dialog>
    </>
  )
}
