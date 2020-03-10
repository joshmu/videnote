import React, { useContext } from 'react'
import { playerContext } from '../context/player/PlayerState'

const Timeline = () => {
  const { progress } = useContext(playerContext)
  /*
  progress: {
        playedSeconds: 0,
        played: 0,
        loadedSeconds: 0,
        loaded: 0
      }
      */

  return (
    <div style={timelineWrapper}>
      <div
        style={{
          width: `${+(progress.played * 100).toFixed(2)}%`,
          background: 'salmon',
          height: '0.2rem'
        }}
      ></div>
    </div>
  )
}

const timelineWrapper = {
  background: 'white'
}

export default Timeline
