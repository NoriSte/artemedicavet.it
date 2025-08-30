import Link from 'next/link'
import { NavigationMenuToggle } from './NavigationMenuToggle'
import { NavigationMenuClientLogic } from './NavigationMenuClientLogic'
import type { PropsWithChildren } from 'react'
import { DesktopPrimaryNav } from '../desktopPrimaryNav/DesktopPrimaryNav'
import { MobilePrimaryNav } from '../mobilePrimaryNav/mobilePrimaryNav'

type LinkProps = React.ComponentProps<typeof Link>
type CurrentRoute = LinkProps['href']

type Props = PropsWithChildren<{ currentPage?: CurrentRoute }>

export function Header(props: Props) {
  const { currentPage } = props

  return (
    <header>
      <NavigationMenuClientLogic>
        <NavigationMenuToggle />
      </NavigationMenuClientLogic>
      <DesktopPrimaryNav currentPage={currentPage} />
      <MobilePrimaryNav currentPage={currentPage} />
    </header>
  )
}
