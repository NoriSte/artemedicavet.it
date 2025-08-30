import Link from 'next/link'

type LinkProps = React.ComponentProps<typeof Link>
type CurrentRoute = LinkProps['href']

type Props = { currentPage?: CurrentRoute }

import './fullNav.css'

export function FullNav(props: Props) {
  const { currentPage } = props

  return (
    <nav aria-label="Tutte le pagine">
      {/* TODO: add ALL the routes */}
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

        <Link href="/chi-siamo" aria-current={currentPage === '/chi-siamo' ? 'page' : undefined}>
          Chi siamo
        </Link>
      </ul>
    </nav>
  )
}
