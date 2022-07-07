import "./style.sass"
import { useEffect, useRef } from "preact/hooks"
import roundPolygon, { InitPoint, RoundedPoint } from "helpers/round"
import { animate } from "helpers/animate"
import { getpoints, getpath, PrePoints, getprepoints } from "./utils"



const
  width = window.innerWidth,
  height = window.innerHeight,
  pivot = { x: width / 2, y: height / 2 },
  num = 8,
  content = "welcome to foretoo page ".replace(/\s/g, "   ").toUpperCase()

let
  prePoints: PrePoints[],
  points: InitPoint[],
  roundedPolygon: RoundedPoint[],
  roundedPath: string

prePoints = getprepoints(num, Math.min(width, height) / 2)
points = getpoints(prePoints, pivot)
roundedPolygon = roundPolygon(points, Number.MAX_SAFE_INTEGER)
roundedPath = getpath(roundedPolygon)



export const BBBL = () => {

  const pathRef = useRef<SVGPathElement>(null)
  const textRef = useRef<SVGTextPathElement>(null)


  useEffect(() => {

    const pathmov = animate({
      dur: 4000,
      ease: "cubicInOut",
      ontick: () => {
        points = getpoints(prePoints, pivot)
        roundedPolygon = roundPolygon(points, Number.MAX_SAFE_INTEGER)
        roundedPath = getpath(roundedPolygon)
        pathRef.current!.setAttribute("d", roundedPath)
        const length = Math.floor(pathRef.current!.getTotalLength()).toString()
        textRef.current!.setAttribute("textLength", length)
      },
      onend: () => {
        pathmov.on(prePoints, getprepoints(num, Math.min(width, height) / 2))
      },
    })

    pathmov.on(prePoints, getprepoints(num, Math.min(width, height) / 2))
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
          ref={pathRef}
          id="textPath"
          d={roundedPath}
        />
      </defs>
      <use href="#textPath" fill="none" stroke="#7fa" stroke-width="70" />
      <use href="#textPath" fill="none" stroke="#fff" stroke-width="20" />
      {/* <path
        d={initPath}
        stroke="#ccc"
        fill="none"
      /> */}
      <text dy="22" >
        <textPath
          ref={textRef}
          href="#textPath"
          spacing="exact"
          lengthAdjust="spacingAndGlyphs"
        >
          {content}
        </textPath>
      </text>
    </svg>
  )
}