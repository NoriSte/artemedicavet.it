import Link from 'next/link'

type LinkProps = React.ComponentProps<typeof Link>
type CurrentRoute = LinkProps['href']

type Props = { currentPage?: CurrentRoute }

export function Header(props: Props) {
  const { currentPage } = props

  return (
    <header>
      <nav>
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
    </header>
  )
}
