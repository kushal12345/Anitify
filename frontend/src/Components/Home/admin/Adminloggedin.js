import React from 'react'

const Adminloggedin = () => {
  return (
    <div className="h-screen bg-gray-900 text-white">
      <aside className="w-1/5 bg-black p-4">
        <div className="flex items-center mb-8">
          <img src="https://placehold.co/50x50" alt="User  profile" className="rounded-full mr-4" />
          <span className="text-xl font-bold">The Weeknd</span>
        </div>
        <nav>
          <ul>
            <li className="mb-4"><i className="fas fa-home mr-2"></i> Home</li>
            <li className="mb-4"><i className="fas fa-search mr-2"></i> Search</li>
            <li className="mb-4"><i className="fas fa-book mr-2"></i> Your Library</li>
            <li className="mb-4"><i className="fas fa-chart-line mr-2"></i> Analytics</li>
            <li className="mb-4"><i className="fas fa-upload mr-2"></i> Upload</li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Good afternoon, The Weeknd</h1>
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-gray-400">Monthly Listeners</h2>
            <p className="text-2xl font-bold">3.2M</p>
            <p className="text-green-500">+20.1% from last month</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-gray-400">Total Streams</h2>
            <p className="text-2xl font-bold">1.8B</p>
            <p className="text-green-500">+15.3% from last month</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-gray-400">Followers</h2>
            <p className="text-2xl font-bold">108.6M</p>
            <p className="text-green-500">+2.5% from last month</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-gray-400">Revenue</h2>
            <p className="text-2xl font-bold">$42.8K</p>
            <p className="text-green-500">+8.2% from last month</p>
          </div>
        </div>
        <div className="mb-8">
          <button className="bg-white text-black px-4 py-2 rounded-full mr-2">For You</button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded-full mr-2">Recently Played</button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded-full">Artist Insights</button>
        </div>
        <h2 className="text-2xl font-bold mb-4">Your Top Artists</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <img src="https://placehold.co/100x100" alt="Artist 1" className="rounded-full mb-4" />
            <p>Artist 1</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <img src="https://placehold.co/100x100" alt="Artist 2" className="rounded-full mb-4" />
            <p>Artist 2</p>
          </div>
          <div className="bg-gray-800 p-4 rounded -lg">
            <img src="https://placehold.co/100x100" alt="Artist 3" className="rounded-full mb-4" />
            <p>Artist 3</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <img src="https://placehold.co/100x100" alt="Artist 4" className="rounded-full mb-4" />
            <p>Artist 4</p>
          </div>
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex items-center">
        <div className="flex items-center">
          <img src="https://placehold.co/50x50" alt="Current song" className="rounded-full mr-4" />
          <div>
            <p className="font-bold">Blinding Lights</p>
            <p>The Weeknd</p>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <i className="fas fa-backward mx-4"></i>
          <i className="fas fa-play mx-4"></i>
          <i className="fas fa-forward mx-4"></i>
        </div>
        <div className="flex items-center">
          <i className="fas fa-heart mx-4"></i>
          <i className="fas fa-random mx-4"></i>
          <i className="fas fa-volume-up mx-4"></i>
        </div>
      </footer>
    </div>
  )
}

export default Adminloggedin