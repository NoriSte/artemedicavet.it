import Link from 'next/link'

type LinkProps = React.ComponentProps<typeof Link>
type CurrentRoute = LinkProps['href']

type Props = { currentPage?: CurrentRoute }

export const mobilePrimaryNavId = 'primaryNav'

import './mobilePrimaryNav.css'

export function MobilePrimaryNav(props: Props) {
  const { currentPage } = props

  return (
    <>
      <button id="openNavigationMenuButton" aria-label="Apri menú di navigazione">
        (icon)
      </button>
      `
      <dialog>
        <div id="dialog-container">
          <button id="closeButton" aria-label="Chiudi menú di navigazione">
            X
          </button>
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
