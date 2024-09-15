import React from 'react'

const Library = () => {
  return (
    <div className="your_library">
                    <div className="leading-6 mt-2 bg-white bg-opacity-20 rounded-xl py-3 px-4">
                        <p className="font-bold">Create your first playlist</p>
                        <p className="">
                            It's easy, we'll help you
                        </p>
                        <button className=" rounded-2xl mx-2 px-2 py-2 bg-accent-blue hover:shadow-md rounded-full  mt-4 px-4 py-0  font-semibold">
                            Create playlist
                        </button>
                    </div>
                    <div className="leading-6 mt-4 bg-white bg-opacity-20 rounded-xl py-3 px-4">
                        <p className="font-bold">
                            Let's find some podcasts to follow
                        </p>
                        <p className="">
                            We'll keep you updated on new episodes
                        </p>
                        <button className="rounded-2xl mx-2 px-2 py-2 bg-accent-blue hover:shadow-md rounded-full  mt-4 px-4 py-0  font-semibold">
                            Browse Podcast
                        </button>
                    </div>
                </div>
  )
}

export default Library