import { useRef, useState } from "preact/hooks"

export const App = () => {

  const [ state, setState ] = useState(0)
  const increase = useRef((prev: number) => prev + 1).current
  const handlePointer = useRef(() => setState(increase)).current

  return (
    <>
      <h1>foretoo here</h1>
      <button onPointerDown={handlePointer}>increase value</button>
      <p>{state}</p>
    </>
  )
}