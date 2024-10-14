import React from 'react'
import { FaBackward, FaPlay, FaForward, FaHeart, FaRandom, FaVolumeUp } from 'react-icons/fa';

const Playbar = () => {
  return (
    <footer className="fixed text-white bottom-0 left-0 right-0 bg-gray-800 p-2 flex items-center">
        <div className="flex items-center">
        <img src="https://placehold.co/50x50" alt="Current song" className="rounded-full mr-4" />
        <div>
            <p className="font-bold">Blinding Lights</p>
            <p>The Weeknd</p>
        </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
            <FaBackward className="mx-4" />
            <FaPlay className="mx-4" />
            <FaForward className="mx-4" />
        </div>
        <div className="flex items-center">
            <FaHeart className="mx-4" />
            <FaRandom className="mx-4" />
            <FaVolumeUp className="mx-4" />
        </div>
  </footer>
  )
}

export default Playbar