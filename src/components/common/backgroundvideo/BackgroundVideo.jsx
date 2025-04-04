import React from 'react'
import videoSrc from '../../../assets/video/1110333_Players_Soccer_3840x2160.mp4';
import NavBar from '../navbar/NavBar';
import Banner from '../../main/Banner/Banner';


const BackgroundVideo = () => {
    return (

        <div className="relative w-full h-screen">
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={videoSrc}
                autoPlay
                muted
                loop
                preload="auto"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
            <div className="relative z-10 w-full h-[65%] bg-opacity-75">
                <NavBar />
                <Banner />
            </div>
        </div>


    )
}

export default BackgroundVideo