import Link from 'next/link'

type LinkProps = React.ComponentProps<typeof Link>
type CurrentRoute = LinkProps['href']

type Props = { currentPage?: CurrentRoute }

export const desktopPrimaryNavId = 'primaryNav'

import './desktopPrimaryNav.css'

export function DesktopPrimaryNav(props: Props) {
  const { currentPage } = props

  return (
    <nav id={desktopPrimaryNavId} aria-label="Pagine principali">
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

        <Link href="/chi-siamo" aria-current={currentPage === '/chi-siamo' ? 'page' : undefined}>
          Chi siamo
        </Link>
      </menu>
    </nav>
  )
}
