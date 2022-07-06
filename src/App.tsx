import { useState } from "preact/hooks"
import { useConst } from "./hooks/useConst"

export const App = () => {

  const [ state, setState ] = useState(0)
  const increase = useConst((prev: number) => prev + 1)
  const handlePointer = useConst(() => setState(increase))

  return (
    <>
      <h1>foretoo here</h1>
      <button onPointerDown={handlePointer}>increase value</button>
      <p>{state}</p>
    </>
  )
}