import { SVGPathData, encodeSVGPath } from "svg-pathdata"
import { SVGCommand } from "svg-pathdata/lib/types"
import { RoundedPoint, InitPoint, Point } from "helpers/round"
import SimplexNoise from "simplex-noise"

const simplex = new SimplexNoise()
const noise = (
  x: number, y: number
) => (
  ( simplex.noise2D(x, y) + 1 ) / 2
)

export type PrePoints = { a: number, l: number }

export const getprepoints = (
  num: number,
  length: number,
  tick: number,
) => {

  const unitang = Math.PI * 2 / num

  return Array(num).fill(null).map((_, i) => {
    const unitlen = length / ( i % 2 === 0 ? 2 : 4 )
    const aoff = noise(tick + i * 5, 0)
    const loff = noise(0, tick + i * 5)
    return {
      a: unitang * i + aoff * unitang * 0.8,
      l: unitlen + loff * unitlen,
    }
  })
}

export const getpoints = (
  prepoints: PrePoints[],
  pivot: Point
) => (
  prepoints.map(({ a, l }) => ({
    x: pivot.x + Math.cos(a) * l,
    y: pivot.y + Math.sin(a) * l,
  }))
)

export const getinitpath = (
  polygon: InitPoint[]
) => (
  encodeSVGPath(
    polygon.map((p, i) => ({
      type: i ? SVGPathData.LINE_TO :  SVGPathData.MOVE_TO,
      relative: false,
      x: p.x,
      y: p.y,
    }))
  ).concat("Z")
)

export const getroundedpath = (
  polygon: RoundedPoint[]
) => (
  encodeSVGPath(
    polygon.reduce((acc: SVGCommand[], p, i) => (
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