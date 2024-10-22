import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2 } from 'lucide-react';
import { useAudio, top20Songs } from '../contexts/AudioContext';

const Player = () => {
  const { currentSong, isPlaying, togglePlay, audioRef, nextSong, previousSong } = useAudio();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [audioRef]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    audioRef.current.volume = volume;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  return (
    <div className="bg-gray-900 border-t border-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-1/4">
          {currentSong !== null && (
            <>
              <img src={`https://source.unsplash.com/random/80x80?music=${currentSong}`} alt="Current track" className="w-14 h-14 object-cover rounded-md mr-4" />
              <div>
                <h4 className="font-semibold">{top20Songs[currentSong].title}</h4>
                <p className="text-sm text-gray-400">{top20Songs[currentSong].artist}</p>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col items-center w-1/2">
          <div className="flex items-center space-x-4 mb-2">
            <button className="text-gray-400 hover:text-white">
              <Shuffle size={20} />
            </button>
            <button className="text-gray-400 hover:text-white" onClick={previousSong}>
              <SkipBack size={24} />
            </button>
            <button
              className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform"
              onClick={() => currentSong !== null && togglePlay(currentSong)}
            >
              {isPlaying ? <Pause fill="black" size={24} /> : <Play fill="black" size={24} />}
            </button>
            <button className="text-gray-400 hover:text-white" onClick={nextSong}>
              <SkipForward size={24} />
            </button>
            <button className="text-gray-400 hover:text-white">
              <Repeat size={20} />
            </button>
          </div>
          <div className="w-full flex items-center">
            <span className="text-xs text-gray-400 w-10">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 mx-2 h-1 bg-gray-700 rounded-full appearance-none"
            />
            <span className="text-xs text-gray-400 w-10">{formatTime(duration)}</span>
          </div>
        </div>
        <div className="flex items-center w-1/4 justify-end">
          <Volume2 size={20} className="text-gray-400 mr-2" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            defaultValue={1}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-gray-700 rounded-full appearance-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;