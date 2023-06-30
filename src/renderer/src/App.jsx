import { useEffect, useState, useRef } from "react"
import test from "./assets/test.mp3"
import bg from "./assets/bg.jpg"
import {
  FiPlay,
  FiPause,
  FiFastForward,
  FiRewind,
  FiFolder,
  FiVolume,
  FiVolume1,
  FiVolume2,
  FiVolumeX
} from "react-icons/fi"
import { useAudio } from "./useAudio"

function pad(num) {
  return String(num).padStart(2, "0")
}

export default function App() {
  const file = useRef(null)

  const handleClick = () => {
    file.current.click()
  }

  const volumeSign = (volume) => {
    if (volume >= 0.5) {
      return <FiVolume2 />
    } else if (volume < 0.5 && volume > 0.25) {
      return <FiVolume1 />
    } else if (volume <= 0.25 && volume > 0) {
      return <FiVolume />
    } else if (volume === 0) {
      return <FiVolumeX />
    }
  }
  const [playing, toggle, audio, sec] = useAudio(test)

  const [selectedFile, setSelectedFile] = useState("")

  const [volState, setvolState] = useState(<></>)

  const [second, setSecond] = useState(0)

  useEffect(() => {
    setSecond(audio.currentTime)
    console.log(second)
  }, [sec])

  const [vol, setVol] = useState(100)

  useEffect(() => {
    audio.volume = vol / 100
    console.log(audio.volume)
    setvolState((_) => volumeSign(vol))
  }, [vol])

  // useEffect(() => {
  //   console.log(selectedFile)
  //   audio.src = selectedFile
  // }, [selectedFile])

  return (
    <>
      <div className="absolute top-10 right-0 flex flex-row">
        {volState}
        <input
          type="range"
          className="w-[100px] outline-none mx-3"
          min={0}
          max={100}
          value={vol}
          onChange={(e) => {
            setVol((_) => e.target.valueAsNumber)
          }}
        />
      </div>
      <div className="draggable h-8 w-screen absolute top-0 left-0 flex justify-center text-center items-center bg-white">
        <header>Music Player</header>
      </div>
      <div className="flex-grow-0 flex h-screen w-screen">
        <img
          src={bg}
          className="w-1/5 object-cover min-w-[320px] h-2/3 my-auto mx-5"
        />
        <img
          src={bg}
          className="absolute w-screen h-screen top-0 left-0 object-cover blur-3xl brightness-75 -z-10"
        />
        <div className="flex flex-col w-full m-6">
          <div className="text-slate-100 my-auto">
            <header className="text-5xl my-4">Drop</header>
            <h6 className="text-xl"></h6>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <p></p>
              <input
                type="range"
                className="w-full outline-none border-none cursor-pointer mx-2"
                min={0}
                // max={duration / 1000}
                max={Math.floor(audio.duration)}
                defaultValue={0}
                value={second}
                onChange={(e) => {
                  const time_seek = e.target.valueAsNumber
                  audio.currentTime = time_seek
                }}
              />
              <p></p>
            </div>
            <div className="self-center my-6 flex">
              <button
                className="outline-none border-none"
                onClick={() => {
                  audio.currentTime = audio.currentTime - 5
                }}
              >
                <FiRewind size={32} />
              </button>
              <button
                className="mx-12 outline-none border-none"
                onClick={() => {
                  toggle()
                }}
              >
                {!playing ? <FiPlay size={32} /> : <FiPause size={32} />}
              </button>
              <button
                className="outline-none border-none"
                onClick={() => {
                  audio.currentTime = audio.currentTime + 5
                }}
              >
                <FiFastForward size={32} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <button className="absolute bottom-2 left-2" onClick={handleClick}>
        <FiFolder size={24} />
      </button>
      <input
        type="file"
        ref={file}
        className="hidden"
        onChange={(e) => {
          const selectedFile = e.target.files[0]
          setSelectedFile((_) => selectedFile.path)
        }}
      />
    </>
  )
}
