import SimplexNoise from "https://cdn.skypack.dev/simplex-noise@3.0.1"
import { loop, animate, frame } from "https://cdn.skypack.dev/bratik@0.5.7"
import roundPolygon, { RoundedPoint, InitPoint } from "https://cdn.skypack.dev/round-polygon@0.6.7"



///////////////////
//// CONSTANTS ////

const content = "welcome to foretoo page ".replace(/\s/g, "   ").toUpperCase()
const width = window.innerWidth
const height = window.innerHeight
const size = Math.min(width, height) * 0.618 | 0
const fontSize = size / 25 | 0
const pivot = { x: width / 2, y: height / 2 }
const pointer = { x: width / 2, y: height / 2 }
const num = 9



//////////////////
//// ELEMENTS ////

const simplex = new SimplexNoise()
const bl = document.querySelector<SVGElement>("#bl")!
const blpath = document.querySelector<SVGPathElement>("#blpath")!
const blstroke1 = document.querySelector<SVGUseElement>("#blstroke1")!
const blstroke2 = document.querySelector<SVGUseElement>("#blstroke2")!
const bltext = document.querySelector<SVGTextElement>("#bltext")!
const bltextpath = document.querySelector<SVGTextPathElement>("#bltextpath")!

bl.setAttribute("viewbox", `0 0 ${width} ${height}`)
bl.setAttribute("width", `${width}`)
bl.setAttribute("height", `${height}`)
blstroke1.setAttribute("stroke-width", `${ size / 12 | 0 }`)
blstroke2.setAttribute("stroke-width", `${ size / 12 - 2 | 0 }`)
blstroke1.setAttribute("stroke-dasharray", `0 ${ size / 20 | 0 }`)
blstroke2.setAttribute("stroke-dasharray", `0 ${ size / 20 | 0 }`)
bltext.setAttribute("dy", `${ fontSize * 0.618 | 0 }`)
bltextpath.style.fontSize = `${fontSize}px`
bltextpath.innerHTML = `${content.concat(content)}`



////////////////
//// PLAYER ////

loop(() => {
  const path = getpath()
  blpath.setAttribute("d", path)
})

animate({
  loop: true,
  ontick: () => {
    const length = Math.floor(blpath.getTotalLength())
    const ratio = (frame / 618) % 1
    const offset = -length + ratio * length
    bltext.setAttribute("startOffset", (offset).toString())
    bltext.setAttribute("textLength", (length * 2).toString())
    bltextpath.setAttribute("startOffset", (offset).toString())
    bltextpath.setAttribute("textLength", (length * 2).toString())
  }
}).play()



/////////////////
//// POINTER ////

const moveListener = (e: PointerEvent) => {
  pointer.x = e.pageX
  pointer.y = e.pageY
}
animate({
  loop: true,
  ontick: () => {
    pivot.x += (pointer.x - pivot.x) * 0.005
    pivot.y += (pointer.y - pivot.y) * 0.005
  }
}).play()
window.addEventListener("pointermove", moveListener)



//////////////
//// INIT ////

let
  length: number,
  unitang: number,
  unitlen: number,
  emptypoints: never[],
  prepoints: { a: number, l: number }[],
  points: InitPoint[],
  roundedpoints: RoundedPoint[],
  path: string

init(size, num)
console.log(getpath().replace(/\.\d+/g, ""))



//////////////
//// CORE ////

function noise(x: number, y: number) { return (simplex.noise2D(x, y) + 1) / 2 }

function getprepoints() {
  return emptypoints.map((_, i) => ({
    a: frame / 500 + unitang * i,
    l: unitlen + noise(0, frame / 1000 + i * 5) * unitlen * 4, 
  }))
}

function getpoints() {
  return prepoints.map(({ a, l }) => ({
    x: pivot.x + Math.cos(a) * l,
    y: pivot.y + Math.sin(a) * l,
  }))
}

function getroundedpath () {
  return roundedpoints.reduce((
    acc: string, p, i
  ) => acc.concat(
    `${i ? "L" : "M"}${p.in.x} ${p.in.y} A${p.arc.radius} ${p.arc.radius} 0 0 ${p.angle.dir === 1 ? 0 : 1} ${p.out.x} ${p.out.y}`
  ), "").concat("Z")
}

function getpath() {
  prepoints = getprepoints()
  points = getpoints()
  roundedpoints = roundPolygon(points, Number.MAX_SAFE_INTEGER)
  path = getroundedpath()
  
  return path
}

// function getmeanpoint() {
//   return points.reduce((sum: Point, p, i) => {
//     if (i === points.length - 1) return {
//       x: (sum.x + p.x) / points.length,
//       y: (sum.y + p.y) / points.length
//     }
//     return {
//       x: sum.x + p.x,
//       y: sum.y + p.y
//     }
//   })
// }

function init(
  size: number,
  num: number
) {
  length = size / 2
  unitang = Math.PI * 2 / num
  unitlen = length / 5
  emptypoints = Array(num).fill(null) as never[]

  getpath()

  return getpath
}