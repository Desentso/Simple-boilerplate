import React from "react"
import Footer from "../Marketing/Footer"
import Header from "../Marketing/Header"

const Home = () => {

  return <>
    <div className="pt-6">
      <Header />
    </div>
    <div className="w-[1280px] max-w-[98%] mx-auto mt-10 flex flex-col items-center min-h-[60vh] pb-20">
      <h1 className="text-4xl font-semibold mt-8">Home</h1>
    </div>
    <Footer />
  </>;
}

export default Home