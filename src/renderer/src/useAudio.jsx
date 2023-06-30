import React, { useState, useEffect } from "react"

export const useAudio = (url) => {
  const [audio] = useState(new Audio(url))
  const [playing, setPlaying] = useState(false)
  const [sec, setSec] = useState(0)
  const toggle = () => setPlaying(!playing)

  useEffect(() => {
    playing ? audio.play() : audio.pause()
  }, [playing])

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false))
    audio.addEventListener("timeupdate", () => {
      setSec(audio.currentTime)
    })
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false))
    }
  }, [])

  return [playing, toggle, audio, sec]
}
