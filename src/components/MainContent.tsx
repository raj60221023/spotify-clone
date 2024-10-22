import React from 'react';
import { Play, Pause, Heart } from 'lucide-react';
import { useAudio, top20Songs } from '../contexts/AudioContext';

const MainContent = () => {
  const { currentSong, isPlaying, togglePlay } = useAudio();

  const playlists = [
    { id: 1, name: "Today's Top Hits", image: "https://source.unsplash.com/random/300x300?music" },
    { id: 2, name: "Discover Weekly", image: "https://source.unsplash.com/random/300x300?concert" },
    { id: 3, name: "Release Radar", image: "https://source.unsplash.com/random/300x300?album" },
    { id: 4, name: "Your Top Songs 2023", image: "https://source.unsplash.com/random/300x300?singer" },
  ];

  const topArtists = [
    { name: "Alan Walker", image: "https://source.unsplash.com/random/300x300?dj" },
    { name: "Justin Bieber", image: "https://source.unsplash.com/random/300x300?popstar" },
    { name: "Anne-Marie", image: "https://source.unsplash.com/random/300x300?singer" },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-purple-900 to-black p-8">
      <h2 className="text-3xl font-bold mb-6">Good afternoon</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="bg-white bg-opacity-10 rounded-md flex items-center overflow-hidden hover:bg-opacity-20 transition-all group">
            <img src={playlist.image} alt={playlist.name} className="w-20 h-20 object-cover" />
            <span className="ml-4 font-semibold">{playlist.name}</span>
            <button className="ml-auto mr-4 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Play fill="white" size={16} />
            </button>
          </div>
        ))}
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Top 20 Songs - Alan Walker, Justin Bieber, Anne-Marie</h2>
      <div className="bg-gray-900 rounded-lg p-6 mb-8">
        <div className="flex items-center mb-6">
          {topArtists.map((artist, index) => (
            <div key={index} className="flex flex-col items-center mr-8">
              <img src={artist.image} alt={artist.name} className="w-24 h-24 rounded-full object-cover mb-2" />
              <span className="text-sm font-semibold">{artist.name}</span>
            </div>
          ))}
        </div>
        <ul className="divide-y divide-gray-800">
          {top20Songs.map((song, index) => (
            <li key={index} className="py-3 flex items-center justify-between hover:bg-gray-800 rounded-md transition-colors">
              <div className="flex items-center">
                <span className="w-8 text-right mr-4 text-gray-400">{index + 1}</span>
                <div>
                  <h3 className="font-semibold">{song.title}</h3>
                  <p className="text-sm text-gray-400">{song.artist}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button className="text-gray-400 hover:text-white mr-4">
                  <Heart size={20} />
                </button>
                <button
                  className="text-gray-400 hover:text-white"
                  onClick={() => togglePlay(index)}
                >
                  {currentSong === index && isPlaying ? (
                    <Pause size={20} />
                  ) : (
                    <Play size={20} />
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <h2 className="text-2xl font-bold mb-4">Made for You</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-900 p-4 rounded-md hover:bg-gray-800 transition-all group">
            <div className="relative mb-4">
              <img src={`https://source.unsplash.com/random/300x300?music=${index}`} alt="Album cover" className="w-full aspect-square object-cover rounded-md shadow-lg" />
              <button className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                <Play fill="white" size={24} />
              </button>
            </div>
            <h3 className="font-semibold mb-1">Daily Mix {index + 1}</h3>
            <p className="text-sm text-gray-400">Your daily music mix</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;