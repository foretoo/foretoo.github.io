import { useRef } from "preact/hooks"

export const useConst = <T>(
  any: T
): T => {
  return useRef(any).current
}