import Link from 'next/link'
import { NavigationMenuToggle } from './NavigationMenuToggle'
import { NavigationMenuClientLogic } from './NavigationMenuClientLogic'
import type { PropsWithChildren } from 'react'

type LinkProps = React.ComponentProps<typeof Link>
type CurrentRoute = LinkProps['href']

type Props = PropsWithChildren<{ currentPage?: CurrentRoute }>

export function Header(props: Props) {
  return (
    <header>
      <NavigationMenuClientLogic>
        <NavigationMenuToggle />
      </NavigationMenuClientLogic>
      {props.children}
    </header>
  )
}
