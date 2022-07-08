export const Shape = (
  props: { size: number, id: string },
) => {

  const { size, id } = props

  return (
    <>
      <use
        href={`#${id}`}
        fill="none"
        stroke="#000"
        stroke-width={ size / 12 | 0 }
        stroke-dasharray={ `0 ${size / 20 | 0}` }
      />
      <use
        href={`#${id}`}
        fill="none"
        stroke="#7fa"
        stroke-width={ size / 12 - 2 | 0 }
        stroke-dasharray={ `0 ${size / 20 | 0}` }
      />
      <use href={`#${id}`} fill="#7fa" stroke="none" />
    </>
  )
}