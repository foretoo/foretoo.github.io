import "./style.sass"
import { useEffect, useRef } from "preact/hooks"
import roundPolygon, { InitPoint, RoundedPoint } from "helpers/round"
import { frame, loop } from "helpers/animate"
import { getpoints, getroundedpath, PrePoints, getprepoints, getinitpath } from "./utils"



const
  width = window.innerWidth,
  height = window.innerHeight,
  fontSize = Math.min(width, height) / 25 | 0,
  pivot = { x: width / 2, y: height / 2 },
  num = 6,
  content = "welcome to foretoo page ".replace(/\s/g, "   ").toUpperCase()

let
  prePoints: PrePoints[],
  points: InitPoint[],
  roundedPolygon: RoundedPoint[],
  // initPath: string,
  roundedPath: string

prePoints = getprepoints(num, Math.min(width, height) / 2, 0)
points = getpoints(prePoints, pivot)
// initPath = getinitpath(points)
roundedPolygon = roundPolygon(points, Number.MAX_SAFE_INTEGER)
roundedPath = getroundedpath(roundedPolygon)

console.log(fontSize)


export const BBBL = () => {

  const pathRoundedRef = useRef<SVGPathElement>(null)
  // const pathInitRef = useRef<SVGPathElement>(null)
  const textRef = useRef<SVGTextPathElement>(null)


  useEffect(() => {

    loop(() => {
      prePoints = getprepoints(num, Math.min(width, height) / 2, frame / 333)
      points = getpoints(prePoints, pivot)

      // initPath = getinitpath(points)
      // pathInitRef.current!.setAttribute("d", initPath)
      roundedPolygon = roundPolygon(points, Number.MAX_SAFE_INTEGER)
      roundedPath = getroundedpath(roundedPolygon)
      pathRoundedRef.current!.setAttribute("d", roundedPath)

      const length = Math.floor(pathRoundedRef.current!.getTotalLength())
      const offset = -length + (frame / 444 * length) % length
      textRef.current!.setAttribute("startOffset", (offset).toString())
      textRef.current!.setAttribute("textLength", (length * 2).toString())
    })

  }, [])

  
  return (
    <svg
      class="figure"
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
    >
      <defs>
        <path
          ref={pathRoundedRef}
          id="textPath"
          d={roundedPath}
          // stroke-dasharray="2"
          stroke-linecap="round"
        />
      </defs>

      <use href="#textPath" fill="none" stroke="#000" stroke-width={ fontSize * 1.5 } stroke-dasharray="0 16" />
      <use href="#textPath" fill="none" stroke="#7fa" stroke-width={ fontSize * 1.5 - 2 } stroke-dasharray="0 16" />

      {/* <path
        ref={pathInitRef}
        d={initPath}
        stroke="#ccc"
        fill="none"
      /> */}

      <text dy={ fontSize * 0.4 | 0 } >
        <textPath
          ref={textRef}
          href="#textPath"
          lengthAdjust="spacingAndGlyphs"
          style={{ fontSize }}
        >
          {content.concat(content)}
        </textPath>
      </text>

    </svg>
  )
}