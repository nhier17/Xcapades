import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import { MdOutlineFullscreen } from "react-icons/md";
import { FaPlay, FaPause } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useStateContext } from "../contexts/ContextProvider";

const VideoTrailer = ({ onClose, videoSrc, videoRef }) => {
  const {
    isPlaying,
    setIsPlaying,
    progress,
    setProgress,
    setIsNavVisible,
    isTrailerOpen,
  } = useStateContext();

  // Play or Pause the video
  const togglePlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Update progress bar
  const handleProgress = () => {
    if (videoRef.current) {
      const progressValue =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progressValue);
    }
  };

  // Handle Fullscreen
  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      }
    }
  };

    // Auto-play and reset video state based on isOpen
    useEffect(() => {
      if (isTrailerOpen && videoRef.current) {
        videoRef.current.play();
        setIsPlaying(true);
        setIsNavVisible(false);
      } else if (!isTrailerOpen && videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0; 
        setIsPlaying(false);
        setIsNavVisible(false);
      }
    }, [isTrailerOpen, setIsPlaying, setIsNavVisible, videoRef]);

  // GSAP animation for opening and closing
  useGSAP(() => {
    if (isTrailerOpen) {
      gsap.to("#video-trailer-container", {
        scale: 1,
        opacity: 1,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        duration: 0.5,
        ease: "power1.inOut",
      });
    } else {
      gsap.to("#video-trailer-container", {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power1.inOut",
      });
    }
  }, [isTrailerOpen]);

  // Format time for display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const elapsedTime = videoRef.current?.duration
    ? formatTime((progress / 100) * videoRef.current.duration)
    : "00:00";

  return (
    <section
      id="video-trailer-container"
      className={`fixed top-0 left-0 z-50 bg-black bg-opacity-90 transform transition-all ease-in-out ${
        isTrailerOpen ? "opacity-100" : "opacity-0"
      }`}
      style={{
        scale: isTrailerOpen ? 1 : 0.5,
        transition: "scale 0.5s ease, opacity 0.5s ease",
      }}
    >
      <div className="relative w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-cover"
          onTimeUpdate={handleProgress}
          autoPlay
          controls={false}
        />

        <div className="absolute top-0 left-0 right-4 flex justify-between items-center p-6">
          <div className="flex flex-col gap-4">
            <MdOutlineFullscreen
              onClick={handleFullscreen}
              className="cursor-pointer text-white text-4xl border border-gray-400 hover:border-gray-200 rounded-full p-2"
            />
            <IoIosLink className="cursor-pointer text-white text-4xl border border-gray-400 hover:border-gray-200 rounded-full p-2" />
          </div>
          <IoClose
            onClick={onClose}
            className="cursor-pointer text-white text-4xl border border-gray-400 hover:border-gray-200 rounded-full p-2"
          />
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <h1 className="text-yellow-300 hero-heading">{elapsedTime}</h1>
          <button
            onClick={togglePlayback}
            className="flex items-center gap-1 text-yellow-300 hero-heading"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-yellow-300"
          />
        </div>
      </div>
    </section>
  );
};

export default VideoTrailer;
