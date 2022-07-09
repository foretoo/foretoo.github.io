import "./style.sass"
import { useEffect, useRef } from "preact/hooks"
import { loop } from "helpers/animate"
import { init } from "./core"
import { Face } from "./face"
import { Shape } from "./shape"
import { Text } from "./text"
import { Point } from "round-polygon"



type BBBLProps = {
  size: number,
  num: number,
  pivot: Point,
}

export const BBBL = ({
  size, num, pivot
}: BBBLProps) => {

  const
    getpath = init(size, pivot, num),
    roundedPath = getpath(),
    pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    loop(() => {
      const path = getpath()
      pathRef.current!.setAttribute("d", path)
    })
  }, [])

  
  return (
    <svg
      class="bbbl"
      viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <defs>
        <path
          ref={pathRef}
          id="shapepath"
          d={roundedPath}
          stroke-linecap="round"
        />
      </defs>

      <Shape size={size} id="shapepath" />
      <Face  size={size} />
      <Text  size={size} ref={pathRef} id="shapepath" />

    </svg>
  )
}