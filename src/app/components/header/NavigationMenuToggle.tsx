import './NavigationMenuToggle.css'

export const navigationMenuToggleId = 'navigationMenuToggle'

export function NavigationMenuToggle() {
  return (
    <button
      id={navigationMenuToggleId}
      aria-label="Menú di navigazione"
      aria-expanded="false"
      aria-controls="primaryNav"
    >
      Menu
    </button>
  )
}
