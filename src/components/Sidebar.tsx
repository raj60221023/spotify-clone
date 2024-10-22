import React from 'react';
import { Home, Search, Library, PlusSquare, Heart } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-black p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Spotify</h1>
      </div>
      <nav>
        <ul className="space-y-4">
          <li>
            <a href="#" className="flex items-center space-x-4 text-gray-400 hover:text-white">
              <Home />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-4 text-gray-400 hover:text-white">
              <Search />
              <span>Search</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-4 text-gray-400 hover:text-white">
              <Library />
              <span>Your Library</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className="mt-8">
        <button className="flex items-center space-x-2 text-gray-400 hover:text-white">
          <PlusSquare size={24} />
          <span>Create Playlist</span>
        </button>
        <button className="flex items-center space-x-2 mt-4 text-gray-400 hover:text-white">
          <Heart size={24} />
          <span>Liked Songs</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;