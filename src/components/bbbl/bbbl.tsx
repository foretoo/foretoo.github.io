import "./style.sass"
import { useEffect, useRef } from "preact/hooks"
import roundPolygon, { Point, InitPoint, RoundedPoint } from "helpers/round"
import { frame, loop } from "helpers/animate"
import { getpoints, getroundedpath, PrePoints, getprepoints, getinitpath, getmeanpoint } from "./utils"



const
  width = window.innerWidth,
  height = window.innerHeight,
  fontSize = Math.min(width, height) / 25 | 0,
  pivot = { x: width / 2, y: height / 2 },
  num = 7,
  content = "welcome to foretoo page ".replace(/\s/g, "   ").toUpperCase()

let
  prePoints: PrePoints[],
  points: InitPoint[],
  meanpoint: Point,
  roundedPolygon: RoundedPoint[],
  roundedPath: string

prePoints = getprepoints(num, Math.min(width, height) / 2, 0)
points = getpoints(prePoints, pivot)
meanpoint = getmeanpoint(points)
roundedPolygon = roundPolygon(points, Number.MAX_SAFE_INTEGER)
roundedPath = getroundedpath(roundedPolygon)


export const BBBL = () => {

  const pathRoundedRef = useRef<SVGPathElement>(null)
  const textRef = useRef<SVGTextElement>(null)
  const textPathRef = useRef<SVGTextPathElement>(null)
  const circRef = useRef<SVGCircleElement>(null)

  useEffect(() => {

    const path = pathRoundedRef.current!
    const text = textRef.current!
    const textPath = textPathRef.current!
    const circ = circRef.current!

    loop(() => {
      prePoints = getprepoints(num, Math.min(width, height) / 2, frame / 333)
      points = getpoints(prePoints, pivot)

      roundedPolygon = roundPolygon(points, Number.MAX_SAFE_INTEGER)
      roundedPath = getroundedpath(roundedPolygon)
      path.setAttribute("d", roundedPath)

      const length = Math.floor(path.getTotalLength())
      const ratio = (frame / 618) % 1
      const offset = -length + ratio * length
      
      text.setAttribute("startOffset", (offset).toString())
      text.setAttribute("textLength", (length * 2).toString())
      textPath.setAttribute("startOffset", (offset).toString())
      textPath.setAttribute("textLength", (length * 2).toString())

      meanpoint = getmeanpoint(points)
      circ.setAttribute("cx", meanpoint.x.toString())
      circ.setAttribute("cy", meanpoint.y.toString())
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
          stroke-linecap="round"
        />
      </defs>

      <use
        href="#textPath"
        fill="none"
        stroke="#000"
        stroke-width={ fontSize * 2 }
        stroke-dasharray={ `0 ${fontSize * 1.2}` }
      />
      <use
        href="#textPath"
        fill="none"
        stroke="#7fa"
        stroke-width={ fontSize * 2 - 2 }
        stroke-dasharray={ `0 ${fontSize * 1.2}` }
      />
      <use href="#textPath" fill="#7fa" stroke="none" />

      <circle
        ref={circRef}
        cx={meanpoint.x}
        cy={meanpoint.y}
        r={fontSize * 0.75 | 0}
        fill="black"
      />

      <text
        dy={ fontSize * 0.618 | 0 }
        ref={textRef}
        lengthAdjust="spacingAndGlyphs"
      >
        <textPath
          ref={textPathRef}
          href="#textPath"
          style={{ fontSize }}
          lengthAdjust="spacingAndGlyphs"
        >
          {content.concat(content)}
        </textPath>
      </text>

    </svg>
  )
}