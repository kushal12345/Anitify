import React from 'react'
import AuthContext from '../../Hooks/Auth/AuthContext'
import { useContext } from 'react'

const Adminloggedin = () => {
  const {cookies} = useContext(AuthContext);

  return (
    <div className="h-screen mb-10 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ">
      <main className="flex-1 p-8 pb-10 mb-10" >
        <h1 className="text-3xl font-bold mb-8">Good afternoon, {(cookies.User.name)?cookies.User.name:"User"}</h1>
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="glass p-4 rounded-lg">
            <h2 className="text-white">Monthly Listeners</h2>
            <p className="text-2xl font-bold">3.2M</p>
            <p className="text-green-500">+20.1% from last month</p>
          </div>
          <div className="glass  p-4 rounded-lg">
            <h2 className="text-white">Total Streams</h2>
            <p className="text-2xl font-bold">1.8B</p>
            <p className="text-green-500">+15.3% from last month</p>
          </div>
          <div className="glass p-4 rounded-lg">
            <h2 className="text-white">Followers</h2>
            <p className="text-2xl font-bold">108.6M</p>
            <p className="text-green-500">+2.5% from last month</p>
          </div>
          <div className="glass  p-4 rounded-lg">
            <h2 className="text-white">Revenue</h2>
            <p className="text-2xl font-bold">$42.8K</p>
            <p className="text-green-500">+8.2% from last month</p>
          </div>
        </div>
        <div className="mb-8">
          <button className="bg-white text-black px-4 py-2 rounded-full mr-2">For You</button>
          <button className="glass bg-opacity-40 text-white px-4 py-2 rounded-full mr-2">Recently Played</button>
          <button className="glass bg-opacity-40 text-white px-4 py-2 rounded-full">Artist Insights</button>
        </div>
        <h2 className="text-2xl font-bold mb-4">Your Top Artists</h2>
        <div className="grid grid-cols-4 gap-4 my-5">
          <div className="glass bg-opacity-35 p-4 rounded-lg">
            <img src="https://placehold.co/100x100" alt="Artist 1" className="rounded-full mb-4" />
            <p>Artist 1</p>
          </div>
          <div className="glass bg-opacity-35 p-4 rounded-lg">
            <img src="https://placehold.co/100x100" alt="Artist 2" className="rounded-full mb-4" />
            <p>Artist 2</p>
          </div>
          <div className="glass bg-opacity-35 p-4 rounded -lg">
            <img src="https://placehold.co/100x100" alt="Artist 3" className="rounded-full mb-4" />
            <p>Artist 3</p>
          </div>
          <div className="glass bg-opacity-35 p-4 rounded-lg">
            <img src="https://placehold.co/100x100" alt="Artist 4" className="rounded-full mb-4" />
            <p>Artist 4</p>
          </div>
        </div>

        <h2 className="text-2xl my-8 font-bold mb-4">Your Top Artists</h2>
        <div className="grid grid-cols-4 gap-4 my-5">
          <div className="glass bg-opacity-35 p-4 rounded-lg">
            <img src="https://placehold.co/100x100" alt="Artist 1" className="rounded-full mb-4" />
            <p>Artist 1</p>
          </div>
          <div className="glass bg-opacity-35 p-4 rounded-lg">
            <img src="https://placehold.co/100x100" alt="Artist 2" className="rounded-full mb-4" />
            <p>Artist 2</p>
          </div>
          <div className="glass bg-opacity-35 p-4 rounded -lg">
            <img src="https://placehold.co/100x100" alt="Artist 3" className="rounded-full mb-4" />
            <p>Artist 3</p>
          </div>
          <div className="glass bg-opacity-35 p-4 rounded-lg">
            <img src="https://placehold.co/100x100" alt="Artist 4" className="rounded-full mb-4" />
            <p>Artist 4</p>
          </div>
        </div>

        <h2 className="text-2xl my-8 font-bold mb-4">Your Top Artists</h2>
        <div className="grid grid-cols-4 gap-4 my-5">
          <div className="glass bg-opacity-35 p-4 rounded-lg">
            <img src="https://placehold.co/100x100" alt="Artist 1" className="rounded-full mb-4" />
            <p>Artist 1</p>
          </div>
          <div className="glass bg-opacity-35 p-4 rounded-lg">
            <img src="https://placehold.co/100x100" alt="Artist 2" className="rounded-full mb-4" />
            <p>Artist 2</p>
          </div>
          <div className="glass bg-opacity-35 p-4 rounded -lg">
            <img src="https://placehold.co/100x100" alt="Artist 3" className="rounded-full mb-4" />
            <p>Artist 3</p>
          </div>
          <div className="glass bg-opacity-35 p-4 rounded-lg">
            <img src="https://placehold.co/100x100" alt="Artist 4" className="rounded-full mb-4" />
            <p>Artist 4</p>
          </div>
        </div>

        
      </main>
      
    </div>
  )
}

export default Adminloggedin