// "use client";  // This marks the component as a Client Component
// /* eslint-disable @next/next/no-img-element */

// import React, { useState, useEffect } from 'react';
// import { Box, LinearProgress, IconButton } from '@mui/material';
// import { ArrowBackIos, ArrowForwardIos, Close } from '@mui/icons-material';

// const images = [
//   'https://s3.ap-south-1.amazonaws.com/lodhagroup.in-tfz/1263x550_Gymnasium-marq.jpg',
//   'https://s3.ap-south-1.amazonaws.com/lodhagroup.in-tfz/1263x550_Alfresco-Pavilion-marq.jpg',
//   'https://s3.ap-south-1.amazonaws.com/lodhagroup.in-tfz/1263x550_Gymnasium-marq.jpg',
//   'https://s3.ap-south-1.amazonaws.com/lodhagroup.in-tfz/1263x550_Gymnasium-marq.jpg',
//   'https://s3.ap-south-1.amazonaws.com/lodhagroup.in-tfz/1263x550_Alfresco-Pavilion-marq.jpg',
//   'https://s3.ap-south-1.amazonaws.com/lodhagroup.in-tfz/1263x550_Gymnasium-marq.jpg',
// ];

// // Path to the sound file (it should be in the 'public' directory)
// const notificationSound = '/happy-pop-2-185287.mp3';  // Ensure this file is in the public directory

// const StoryProgress = () => {
//   const [currentImage, setCurrentImage] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [visible, setVisible] = useState(false); // Control the visibility of the reel
//   const [showAnimation, setShowAnimation] = useState(false); // Control for pop-up animation

//   useEffect(() => {
//     const sound = new Audio(notificationSound); // Create audio instance for the notification sound

//     // Attempt to play the sound when the reel becomes visible
//     const playSound = async () => {
//       try {
//         await sound.play(); // Attempt to play the sound
//         console.log('Sound played successfully');
//       } catch (err) {
//         console.error('Failed to play sound:', err);
//       }
//     };

//     // Show the reel after 10 seconds
//     const timer = setTimeout(() => {
//       setVisible(true);
//       setShowAnimation(true); // Trigger the pop-up animation
//       playSound(); // Play the notification sound when the reel becomes visible
//     }, 10000);

//     return () => clearTimeout(timer); // Cleanup on unmount
//   }, []);

//   useEffect(() => {
//     if (visible) {
//       // Start the progress bar and image transitions
//       const timer = setInterval(() => {
//         setProgress((prevProgress) => {
//           if (prevProgress >= 100) {
//             setCurrentImage((prevImage) => (prevImage + 1) % images.length);
//             return 0;
//           }
//           return prevProgress + 1;
//         });
//       }, 100); // Progress bar updates every 100ms for a smoother transition

//       return () => {
//         clearInterval(timer);
//       };
//     }
//   }, [visible]);

//   const handlePrev = () => {
//     setCurrentImage((prevImage) => (prevImage === 0 ? images.length - 1 : prevImage - 1));
//     setProgress(0);
//   };

//   const handleNext = () => {
//     setCurrentImage((prevImage) => (prevImage + 1) % images.length);
//     setProgress(0);
//   };

//   const handleDelete = () => {
//     setShowAnimation(false); // Trigger scale-down animation
//     setTimeout(() => setVisible(false), 300); // Wait for animation to complete before hiding
//   };

//   if (!visible) {
//     return null; // Do not render anything if not visible
//   }

//   return (
//     <Box
//       sx={{
//         width: '400px', // Reduced width for a smaller size
//         height: '220px', // Adjusted height for a widescreen aspect ratio
//         position: 'fixed', // Fixed to bottom-right
//         bottom: '20px',  // Keep some distance from the bottom
//         right: '20px',  // Keep some distance from the right
//         zIndex: 2000, // Ensure it appears above other elements
//         boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)', // Strong shadow for a premium effect
//         backgroundColor: '#000', // Black background to resemble a TV screen
//         overflow: 'hidden', // Prevent content overflow
//         padding: '0', // Remove extra padding
//         opacity: showAnimation ? 1 : 0, // Fade-in effect
//         transform: showAnimation ? 'scale(1)' : 'scale(0.9)', // Pop-up scale effect
//         transition: 'opacity 0.5s ease, transform 0.5s ease', // Smooth transition
//       }}
//     >
//       {/* Cross Icon (Delete) */}
//       <IconButton
//         onClick={handleDelete}
//         sx={{
//           position: 'absolute',
//           top: '10px',
//           right: '10px',
//           zIndex: 2,
//           color: 'white', // White color for visibility on black background
//           backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black background for icon
//           borderRadius: '50%', // Keep the delete button round
//           padding: '5px', // Adjust padding for a smaller button
//           boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.3)', // Slight shadow for the button
//         }}
//       >
//         <Close />
//       </IconButton>

//       <IconButton
//         onClick={handlePrev}
//         sx={{
//           position: 'absolute',
//           left: '10px',
//           top: '50%',
//           transform: 'translateY(-50%)',
//           zIndex: 1,
//           backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white for contrast
//           borderRadius: '50%',
//           padding: '8px', // Smaller padding for smaller buttons
//           boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
//         }}
//       >
//         <ArrowBackIos />
//       </IconButton>
//       <img
//         src={images[currentImage]}
//         alt={`Story ${currentImage}`}
//         style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Cover the entire container
//       />
//       <IconButton
//         onClick={handleNext}
//         sx={{
//           position: 'absolute',
//           right: '10px',
//           top: '50%',
//           transform: 'translateY(-50%)',
//           zIndex: 1,
//           backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white for contrast
//           borderRadius: '50%',
//           padding: '8px',
//           boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
//         }}
//       >
//         <ArrowForwardIos />
//       </IconButton>

//       {/* Linear progress indicators */}
//       <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex' }}>
//         {images.map((_, index) => (
//           <LinearProgress
//             key={index}
//             variant="determinate"
//             value={currentImage > index ? 100 : currentImage === index ? progress : 0}
//             sx={{
//               flex: 1,
//               mx: 0.25, // Adjust spacing between progress bars
//               '& .MuiLinearProgress-bar': {
//                 transition: 'width 0.1s linear',
//               },
//               height: '3px', // Keep the progress bars small for a sleek look
//               backgroundColor: '#555', // Darker background for the progress bar
//             }}
//           />
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default StoryProgress;


'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const tvAdVideo = 'https://www.youtube.com/embed/_FHHN_3R7ZQ?autoplay=1&mute=1'; // YouTube embed link with autoplay and mute

const PopupTVAd = () => {
  const [visible, setVisible] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Show the TV ad after 10 seconds
    const timer = setTimeout(() => {
      if (window.innerWidth > 768) { // Hide for mobile devices
        setVisible(true);
        setShowAnimation(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowAnimation(false);
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return (
    <Box
      sx={{
        width: '400px',
        height: '220px',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 2000,
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)',
        backgroundColor: '#000',
        overflow: 'hidden',
        padding: 0,
        opacity: showAnimation ? 1 : 0,
        transform: showAnimation ? 'scale(1)' : 'scale(0.9)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 2,
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '50%',
          padding: '5px',
        }}
      >
        <Close />
      </IconButton>

      {/* YouTube Video Embed */}
      <iframe
        width="100%"
        height="100%"
        src={tvAdVideo}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </Box>
  );
};

export default PopupTVAd;
