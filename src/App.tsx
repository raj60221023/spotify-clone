import React from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Player from './components/Player';
import { AudioProvider } from './contexts/AudioContext';

function App() {
  return (
    <AudioProvider>
      <div className="flex flex-col h-screen bg-black text-white">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <MainContent />
        </div>
        <Player />
      </div>
    </AudioProvider>
  );
}

export default App;