import { SVGPathData, encodeSVGPath } from "svg-pathdata"
import { SVGCommand } from "svg-pathdata/lib/types"
import { RoundedPoint, Point } from "helpers/round"

export type PrePoints = { a: number, l: number }

let angoffset = Math.random() * Math.PI * 2

export const getprepoints = (
  num: number,
  length: number,
) => {

  angoffset += Math.PI / 3 + Math.random() * Math.PI / 3
  const unitang = Math.PI * 2 / num

  return Array(num).fill(null).map((_, i) => {
    const unitlen = length / ( i % 2 === 0 ? 2 : 4 )
    return {
      a: angoffset + unitang * i + (Math.random() - 0.5) * unitang * 0.8,
      l: unitlen + Math.random() * unitlen,
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

export const getpath = (
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