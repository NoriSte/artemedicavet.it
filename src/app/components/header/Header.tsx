import Link from 'next/link'

import type { PropsWithChildren } from 'react'
import { DesktopPrimaryNav } from '../desktopPrimaryNav/DesktopPrimaryNav'
import { MobilePrimaryNav } from '../mobilePrimaryNav/mobilePrimaryNav'
import { MobilePrimaryNavClientLogic } from '../mobilePrimaryNav/MobilePrimaryNavClientLogic'

type LinkProps = React.ComponentProps<typeof Link>
type CurrentRoute = LinkProps['href']

type Props = PropsWithChildren<{ currentPage?: CurrentRoute }>

export function Header(props: Props) {
  const { currentPage } = props

  return (
    <header>
      <DesktopPrimaryNav currentPage={currentPage} />
      <MobilePrimaryNavClientLogic>
        <MobilePrimaryNav currentPage={currentPage} />
      </MobilePrimaryNavClientLogic>
    </header>
  )
}
