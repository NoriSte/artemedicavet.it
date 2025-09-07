import Link from 'next/link'

type LinkProps = React.ComponentProps<typeof Link>
type CurrentRoute = LinkProps['href']

type Props = { currentPage?: CurrentRoute }

export const mobilePrimaryNavId = 'mobilePrimaryNav'
export const mobileNavDialogId = 'mobileNavDialog'

import './mobilePrimaryNav.css'

export function MobilePrimaryNav(props: Props) {
  const { currentPage } = props

  return (
    <>
      <button
        id="openNavigationMenuButton"
        aria-label="Apri menú di navigazione"
        aria-haspopup="menu"
        aria-controls={mobileNavDialogId}
      >
        (icon)
      </button>
      `
      <dialog aria-modal="true" aria-labelledby="TODO:" id={mobileNavDialogId}>
        <div id="dialog-container">
          <button id="closeButton" aria-label="Chiudi menú di navigazione">
            X
          </button>
          <nav id={mobilePrimaryNavId}>
            <menu>
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
            </menu>
          </nav>
        </div>
      </dialog>
    </>
  )
}
