import { animate } from "helpers/animate"
import { useEffect } from "preact/hooks"
import { BBBL } from "./components/bbbl"

const pivot = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
}
const pointer = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
}
const moveListener = (e: PointerEvent) => {
  pointer.x = e.offsetX
  pointer.y = e.offsetY
}

export const App = () => {

  useEffect(() => {
    animate({
      loop: true,
      ontick: () => {
        pivot.x += (pointer.x - pivot.x) * 0.01
        pivot.y += (pointer.y - pivot.y) * 0.01
      }
    }).play()
    window.addEventListener("pointermove", moveListener)
    return () => window.removeEventListener("pointermove", moveListener)
  })

  return (
    <>
      <BBBL
        size={640}
        num={7}
        pivot={pivot}
      />
    </>
  )
}