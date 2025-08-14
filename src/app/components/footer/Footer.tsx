import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren

export function Footer(props: Props) {
  return <footer>{props.children}</footer>
}
