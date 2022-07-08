import { BBBL } from "./components/bbbl"

export const App = () => {

  return (
    <>
      <BBBL
        size={640}
        num={7}
        pivot={{
          x: window.innerWidth / 2,
          y: window.innerHeight / 2
        }}
      />
    </>
  )
}