import { SVGPathData, encodeSVGPath } from "svg-pathdata"
import { SVGCommand } from "svg-pathdata/lib/types"
import roundPolygon, { RoundedPoint, InitPoint, Point } from "round-polygon"
import SimplexNoise from "simplex-noise"
import { frame } from "helpers/animate"



type PrePoint = { a: number, l: number }

let
  _pivot: Point,
  length: number,
  unitang: number,
  unitlen: number,
  emptypoints: never[],
  prepoints: PrePoint[],
  points: InitPoint[],
  roundedpoints: RoundedPoint[],
  path: string



const simplex = new SimplexNoise()
const noise = (
  x: number, y: number
) => (
  ( simplex.noise2D(x, y) + 1 ) / 2
)


const getprepoints = () => (
  emptypoints.map((_, i) => ({
    a: frame / 500 + unitang * i,
    l: unitlen + noise(0, frame / 1000 + i * 5) * unitlen * 4, 
  }))
)


const getpoints = () => (
  prepoints.map(({ a, l }) => ({
    x: _pivot.x + Math.cos(a) * l,
    y: _pivot.y + Math.sin(a) * l,
  }))
)


const getroundedpath = () => (
  encodeSVGPath(
    roundedpoints.reduce((
      acc: SVGCommand[], p, i
    ) => (
      acc.concat([
        {
          type: i ? SVGPathData.LINE_TO :  SVGPathData.MOVE_TO,
          relative: false,
          x: p.in.x,
          y: p.in.y,
        }, {
          type: SVGPathData.ARC,
          relative: false,
          x: p.out.x,
          y: p.out.y,
          rX: p.arc.radius,
          rY: p.arc.radius,
          xRot: 0,
          sweepFlag: p.angle.dir === 1 ? 0 : 1,
          lArcFlag: 0
        }
      ])
    ), [])
  ).concat("Z")
)


const getpath = () => {
  prepoints = getprepoints()
  points = getpoints()
  roundedpoints = roundPolygon(points, Number.MAX_SAFE_INTEGER)
  path = getroundedpath()
  
  return path
}


export const getmeanpoint = () => (
  points.reduce((sum: Point, p, i) => {
    if (i === points.length - 1) return {
      x: (sum.x + p.x) / points.length,
      y: (sum.y + p.y) / points.length
    }
    return {
      x: sum.x + p.x,
      y: sum.y + p.y
    }
  })
)


export const init = (
  size: number,
  pivot: Point,
  num: number
) => {

  _pivot = pivot
  length = size / 2
  unitang = Math.PI * 2 / num
  unitlen = length / 5
  emptypoints = Array(num).fill(null) as never[]

  getpath()

  return getpath
}