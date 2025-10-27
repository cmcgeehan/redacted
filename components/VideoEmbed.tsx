'use client'

import { useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube'
import { MISSION_DETAILS } from '@/lib/constants'

interface VideoEmbedProps {
  isPlaying: boolean
}

export default function VideoEmbed({ isPlaying }: VideoEmbedProps) {
  const playerRef = useRef<any>(null)
  const [showPlayButton, setShowPlayButton] = useState(false)

  // Extract video ID from YouTube Shorts URL
  const getVideoId = (url: string) => {
    const match = url.match(/shorts\/([a-zA-Z0-9_-]+)/)
    return match ? match[1] : ''
  }

  const videoId = getVideoId(MISSION_DETAILS.videoUrl)

  const onReady = (event: any) => {
    playerRef.current = event.target

    if (isPlaying) {
      // Try to autoplay when countdown starts
      try {
        event.target.playVideo()
      } catch (error) {
        // If autoplay fails (browser policy), show manual play button
        setShowPlayButton(true)
      }
    }
  }

  const onError = () => {
    setShowPlayButton(true)
  }

  const handleManualPlay = () => {
    if (playerRef.current) {
      playerRef.current.playVideo()
      setShowPlayButton(false)
    }
  }

  useEffect(() => {
    if (isPlaying && playerRef.current) {
      try {
        playerRef.current.playVideo()
      } catch (error) {
        setShowPlayButton(true)
      }
    }
  }, [isPlaying])

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: isPlaying ? 1 : 0,
      mute: 0, // Start unmuted for dramatic effect
      controls: 0,
      modestbranding: 1,
      rel: 0,
      fs: 0,
      loop: 1,
      playlist: videoId,
    },
  }

  return (
    <div className="fixed bottom-8 right-8 w-[200px] md:w-[300px] aspect-[9/16] z-40 rounded-lg overflow-hidden shadow-2xl border-2 border-spy-red">
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        onError={onError}
        className="w-full h-full"
      />

      {/* Manual play button if autoplay fails */}
      {showPlayButton && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <button
            onClick={handleManualPlay}
            className="bg-spy-red text-white px-6 py-3 rounded-lg font-bold hover:bg-red-600 transition-colors"
          >
            ▶ Play Theme
          </button>
        </div>
      )}
    </div>
  )
}
