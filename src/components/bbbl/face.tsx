import { forwardRef, useEffect, useRef } from "preact/compat"
import { getmeanpoint } from "./core"
import { animate } from "helpers/animate"

export const Face = forwardRef((
  props: { fontSize: number },
) => {

  const fontSize = props.fontSize
  const meanpoint = useRef(getmeanpoint())
  const circRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    animate({
      loop: true,
      ontick: () => {
        meanpoint.current = getmeanpoint()
        circRef.current!.setAttribute("cx", meanpoint.current!.x.toString())
        circRef.current!.setAttribute("cy", meanpoint.current!.y.toString())
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