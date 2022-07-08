import { forwardRef, useEffect, useRef } from "preact/compat"
import { getmeanpoint } from "./core"
import { animate } from "helpers/animate"

export const Face = forwardRef((
  props: { fontSize: number },
) => {

  const fontSize = props.fontSize
  const circRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    animate({
      loop: true,
      ontick: () => {
        const pivot = getmeanpoint()
        circRef.current!.setAttribute("cx", pivot.x.toString())
        circRef.current!.setAttribute("cy", pivot.y.toString())
      }
    }).play()
  }, [])

  return (
    <circle
      ref={circRef}
      r={fontSize * 0.75 | 0}
      fill="black"
    />
  )
})