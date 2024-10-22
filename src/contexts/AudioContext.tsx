import React, { createContext, useState, useContext, useRef } from 'react';

interface AudioContextType {
  currentSong: number | null;
  setCurrentSong: React.Dispatch<React.SetStateAction<number | null>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioRef: React.RefObject<HTMLAudioElement>;
  togglePlay: (index: number) => void;
  nextSong: () => void;
  previousSong: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  const togglePlay = (index: number) => {
    if (currentSong === index) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setCurrentSong(index);
      audioRef.current.src = top20Songs[index].audio;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const nextSong = () => {
    if (currentSong !== null) {
      const nextIndex = (currentSong + 1) % top20Songs.length;
      togglePlay(nextIndex);
    }
  };

  const previousSong = () => {
    if (currentSong !== null) {
      const previousIndex = (currentSong - 1 + top20Songs.length) % top20Songs.length;
      togglePlay(previousIndex);
    }
  };

  return (
    <AudioContext.Provider value={{ currentSong, setCurrentSong, isPlaying, setIsPlaying, audioRef, togglePlay, nextSong, previousSong }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export const top20Songs = [
  { title: "Faded", artist: "Alan Walker", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "Sorry", artist: "Justin Bieber", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "2002", artist: "Anne-Marie", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { title: "Alone", artist: "Alan Walker", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { title: "Love Yourself", artist: "Justin Bieber", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
  { title: "Friends", artist: "Anne-Marie & Marshmello", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
  { title: "Sing Me to Sleep", artist: "Alan Walker", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
  { title: "Yummy", artist: "Justin Bieber", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
  { title: "Ciao Adios", artist: "Anne-Marie", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
  { title: "Darkside", artist: "Alan Walker", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
  { title: "Intentions", artist: "Justin Bieber ft. Quavo", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" },
  { title: "Alarm", artist: "Anne-Marie", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" },
  { title: "On My Way", artist: "Alan Walker, Sabrina Carpenter & Farruko", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3" },
  { title: "Baby", artist: "Justin Bieber ft. Ludacris", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3" },
  { title: "Birthday", artist: "Anne-Marie", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3" },
  { title: "Spectre", artist: "Alan Walker", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3" },
  { title: "Peaches", artist: "Justin Bieber ft. Daniel Caesar & Giveon", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "Don't Leave Me Alone", artist: "Anne-Marie & David Guetta", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "All Falls Down", artist: "Alan Walker ft. Noah Cyrus & Digital Farm Animals", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { title: "Ghost", artist: "Justin Bieber", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
];