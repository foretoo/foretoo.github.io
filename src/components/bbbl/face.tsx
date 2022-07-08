import { forwardRef, Ref, useEffect, useRef } from "preact/compat"
import { Point } from "helpers/round"
import { animate } from "helpers/animate"

export const Face = forwardRef((
  props: { fontSize: number },
  ref: Ref<Point>
) => {

  const fontSize = props.fontSize
  const circRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    animate({
      loop: true,
      ontick: () => {
        circRef.current!.setAttribute("cx", ref.current!.x.toString())
        circRef.current!.setAttribute("cy", ref.current!.y.toString())
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