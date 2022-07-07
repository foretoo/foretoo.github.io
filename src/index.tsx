import { render } from "preact"
import { App } from "./App"
import "./index.sass"

if (import.meta.hot) {
  import.meta.hot.on(
    "vite:beforeUpdate",
    () => console.clear()
  );
}

render(<App />, document.getElementById("root")!)
