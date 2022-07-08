export const Shape = (
  props: { fontSize: number, id: string },
) => {

  const { fontSize, id } = props

  return (
    <>
      <use
        href={`#${id}`}
        fill="none"
        stroke="#000"
        stroke-width={ fontSize * 2 }
        stroke-dasharray={ `0 ${fontSize * 1.2}` }
      />
      <use
        href={`#${id}`}
        fill="none"
        stroke="#7fa"
        stroke-width={ fontSize * 2 - 2 }
        stroke-dasharray={ `0 ${fontSize * 1.2}` }
      />
      <use href={`#${id}`} fill="#7fa" stroke="none" />
    </>
  )
}