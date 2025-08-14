type Props = {
  headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export function WorkingHours(props: Props) {
  const { headingLevel: HeadingTag } = props

  return (
    <>
      <HeadingTag>Orari di apertura</HeadingTag>
      <dl>
        <dt>Lunedì – Venerdì</dt>
        <dd>10:00 – 12:30 / 15:30 – 20:00</dd>

        <dt>Sabato</dt>
        <dd>10:00 – 18:30</dd>

        <dt>Domenica</dt>
        <dd>Chiuso</dd>
      </dl>
    </>
  )
}
