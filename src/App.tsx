import { animate } from "helpers/animate"
import { useEffect } from "preact/hooks"
import { BBBL } from "./components/bbbl"

const size = Math.min(window.innerWidth, window.innerHeight)*0.618|0
console.log(size);

const pivot = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
}
const pointer = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
}
const moveListener = (e: PointerEvent) => {
  pointer.x = e.pageX
  pointer.y = e.pageY
}

export const App = () => {

  useEffect(() => {
    animate({
      loop: true,
      ontick: () => {
        pivot.x += (pointer.x - pivot.x) * 0.005
        pivot.y += (pointer.y - pivot.y) * 0.005
      }
    }).play()
    window.addEventListener("pointermove", moveListener)
    return () => window.removeEventListener("pointermove", moveListener)
  })

  return (
    <>
      <BBBL
        size={size}
        num={9}
        pivot={pivot}
      />
    </>
  )
}