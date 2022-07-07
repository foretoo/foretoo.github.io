type Obj<T> = Record<string | number | symbol, T>

type Ease = "linear" | "cubicIn" | "cubicOut" | "cubicInOut"

type AnimateProps = {
  dur?: number
  loop?: boolean
  ease?: Ease
  onstart?: () => void
  ontick?: () => void
  onpause?: () => void
  onend?: () => void
}

type AnimateCallBacks = "onstart" | "ontick" | "onpause" | "onend"
type AnimateDefaults = Required<Omit<AnimateProps, AnimateCallBacks>>

type AnimateData = Required<AnimateProps> & {
  started: boolean
  paused: boolean
  ended: boolean
  frame: number
  time: number
  t: number

  pause: () => void
  play: () => void
  on: (
    target: Obj<any> | Obj<any>[],
    props: Obj<number> | Obj<number>[]
  ) => void
}



const easing: Record<Ease, (t: number) => number> = {
  linear: (t) => t,
  cubicIn: (t) => t * t * t,
  cubicOut: (t) => 1 - (1 - t) * (1 - t) * (1 - t),
  cubicInOut: (t) => t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) * (-2 * t + 2) * (-2 * t + 2)) / 2,
}

const defaults: AnimateDefaults = { dur: 1000, loop: false, ease: "linear" }

export const animate = ({
  dur = 1000,
  loop = false,
  ease = "linear",
  onstart,
  ontick,
  onpause,
  onend,
}: AnimateProps = defaults) => {

  let
    calc: () => void = () => undefined,
    rafic: number | undefined,
    tmoid: number | undefined,
    starttime: number,
    restarttime: boolean = false



  const it = {
    dur,
    ease,
    loop,
    started: false,
    paused: false,
    ended: false,
    frame: 0,
    time: 0,
    t: 0,

    onstart,
    ontick,
    onpause,
    onend,
  } as AnimateData

  it.pause = () => {
    if (!rafic) return
    it.paused = true
    it.onpause && it.onpause()
    clearTimeout(tmoid)
    cancelAnimationFrame(rafic)
  }

  it.play = () => {
    if (it.started && !it.paused && !it.ended) return
    if (it.ended) reset()
    it.paused = false
    restarttime = true
    fire()
  }

  it.on = (target, props) => {
    if (it.started && !it.ended) return

    if (target instanceof Array) {
      if (props instanceof Array) {
        const
          keys = props.map((prop) => Object.keys(prop)),
          froms = target.map((obj, i) => keys[i].map((key) => obj[key] as number)),
          diffs = props.map((prop, i) => keys[i].map((key, j) => prop[key] - froms[i][j]))

        calc = () => target.forEach((tar, i) =>
          keys[i].forEach((key, j) => {
            tar[key] = froms[i][j] + it.t * diffs[i][j]
          }))
      }
      else {
        const
          keys = Object.keys(props),
          froms = target.map((obj) => keys.map((key) => obj[key] as number)),
          diffs = froms.map((from) => keys.map((key, i) => props[key] - from[i]))

        calc = () => target.forEach((tar, i) =>
          keys.forEach((key, j) => {
            tar[key] = froms[i][j] + it.t * diffs[i][j]
          }))
      }
    }
    else {
      const
        keys = Object.keys(props),
        froms = keys.map((key) => target[key] as number),
        diffs = keys.map((key, i) => (props as Obj<number>)[key] - froms[i])

      calc = () => keys.forEach((key, i) => {
        target[key] = froms[i] + it.t * diffs[i]
      })
    }

    reset()
    fire()
  }

  const fire = () => {
    rafic = loop
      ? requestAnimationFrame(looper)
      : requestAnimationFrame(player)
  }

  const reset = () => {
    it.frame = 0
    it.time = 0
    it.t = 0
    it.started = false
    it.ended = false
  }

  const tick = () => {
    it.t = easing[ease](it.time / it.dur)
    calc()
    ontick && ontick()
    it.ended && onend && onend()
    it.frame++
  }

  const ender = () => {
    it.time = it.dur
    it.ended = true
    tick()
    cancelAnimationFrame(rafic!)
  }

  const starttick = () => {
    if (!it.started) {
      it.started = true
      onstart && onstart()
      starttime = performance.now()
    }
    if (restarttime) {
      restarttime = false
      starttime = performance.now() - it.time
    }
    it.time = Math.min(performance.now() - starttime, it.dur)
  }

  const looper = () => {
    starttick()
    if (it.time === it.dur) {
      it.time = 0
      starttime = performance.now()
    }
    tick()
    !it.paused && (rafic = requestAnimationFrame(looper))
  }

  const player = () => {
    clearTimeout(tmoid)
    starttick()
    if (it.time === it.dur) it.ended = true
    tick()
    if (!it.ended && !it.paused) {
      tmoid = setTimeout(ender, it.dur - it.time)
      rafic = requestAnimationFrame(player)
    }
  }

  return it
}