import "./style.sass"
import { useEffect, useRef } from "preact/hooks"
import { loop } from "helpers/animate"
import { init } from "./core"
import { Face } from "./face"
import { Shape } from "./shape"
import { Text } from "./text"



const
  width = window.innerWidth,
  height = window.innerHeight,
  fontSize = Math.min(width, height) / 25 | 0,
  num = 7,
  getpath = init(width, height, num),
  roundedPath = getpath()


export const BBBL = () => {

  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    loop(() => {
      pathRef.current!.setAttribute("d", getpath())
    })
  }, [])

  
  return (
    <svg
      class="bbbl"
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
    >
      <defs>
        <path
          ref={pathRef}
          id="shapepath"
          d={roundedPath}
          stroke-linecap="round"
        />
      </defs>

      <Shape fontSize={fontSize} id="shapepath" />
      <Face  fontSize={fontSize} />
      <Text  fontSize={fontSize} ref={pathRef} id="shapepath" />

    </svg>
  )
}