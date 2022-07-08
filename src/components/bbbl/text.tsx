import { forwardRef, Ref, useEffect, useRef } from "preact/compat"
import { animate, frame } from "helpers/animate"



const content =
  "welcome to foretoo page "
    .replace(/\s/g, "   ")
    .toUpperCase()



export const Text = forwardRef((
  props: { fontSize: number, id: string },
  ref: Ref<SVGPathElement>
) => {

  const { fontSize, id } = props
  const textRef = useRef<SVGTextElement>(null)
  const textPathRef = useRef<SVGTextPathElement>(null)

  useEffect(() => {
    animate({
      loop: true,
      ontick: () => {
        const length = Math.floor(ref.current!.getTotalLength())
        const ratio = (frame / 618) % 1
        const offset = -length + ratio * length
        textRef.current!.setAttribute("startOffset", (offset).toString())
        textRef.current!.setAttribute("textLength", (length * 2).toString())
        textPathRef.current!.setAttribute("startOffset", (offset).toString())
        textPathRef.current!.setAttribute("textLength", (length * 2).toString())
      }
    }).play()
  }, [])

  return (
    <text
      ref={textRef}
      dy={ fontSize * 0.618 | 0 }
      lengthAdjust="spacingAndGlyphs"
    >
      <textPath
        ref={textPathRef}
        href={`#${id}`}
        style={{ fontSize }}
        lengthAdjust="spacingAndGlyphs"
      >
        {content.concat(content)}
      </textPath>
    </text>
  )
})