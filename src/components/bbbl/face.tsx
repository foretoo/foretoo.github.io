import { useEffect, useRef } from "preact/compat"
import { getmeanpoint } from "./core"
import { animate } from "helpers/animate"

export const Face = (
  props: { size: number },
) => {

  let pivot = getmeanpoint()
  const faceRef = useRef<SVGUseElement>(null)

  useEffect(() => {
    animate({
      loop: true,
      ontick: () => {
        pivot = getmeanpoint()
        faceRef.current!.setAttribute("x", pivot.x.toString())
        faceRef.current!.setAttribute("y", pivot.y.toString())
      }
    }).play()
  }, [])

  return (
    <>
      <symbol
        id="face"
        width="10"
        height="10"
        viewBox="0 0 100 100"
        refX="center"
        refY="center"
      >
        <path d="M50 0V100M0 50H100" />
      </symbol>
      <use
        ref={faceRef}
        href="#face"
        width="50"
        height="50"
        stroke="#000"
      />
    </>
  )
}