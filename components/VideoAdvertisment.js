import React from 'react';
import './VideoAdvertisment.css'; // Import the CSS file

const VideoAdvertisment = () => {
  return (
    <div className="videoContainerxyz">
      <h2 className="videoHeadingxyz">Advertisement</h2>
      <div className="videoWrapperxyz">
        <iframe
          className="videoFramexyz"
          src="https://www.youtube.com/embed/R80RY1FSEX8?start=2155&autoplay=1&mute=1"
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoAdvertisment;
