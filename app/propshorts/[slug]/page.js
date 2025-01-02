"use client";
import { useParams } from 'next/navigation'; // Use this to get slug in Next.js app directory
import { useEffect, useState } from 'react';
import './Reel.css';
import Form from "../../../components/Form"; // Import the Form component


const storiesBySlug = {
  'business-square-in-nalasopara-mumbai-maharashtra': [
      {
          imageUrl: 'https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/11/28113928/Zain-Business-Square-in-Nalasopara-East-Mumbai-1-835x467-1-1.png',
          title: 'Business Without Boundaries',
          description: 'Starting at INR 3.5 Cr, this flexible space that adapts as your business evolves.',
      },
      {
          imageUrl: 'https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/11/28114332/Zain-Business-Square-in-Nalasopara-East-Mumbai-3-928x623-1.png',
          title: 'Visibility Equals Value',
          description: 'Maximized exposure for greater business opportunities.',
      },
      {
        imageUrl: 'https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/11/28120324/Zain-Business-Square-in-Nalasopara-East-Mumbai-2-1.png',
        title: 'Investment Stability',
        description: 'Secure a property with lasting market appeal.',
    },
    {
        imageUrl: 'https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/11/28113928/Zain-Business-Square-in-Nalasopara-East-Mumbai-1-835x467-1-1.png',
        title: 'Established Neighboring Businesses',
        description: 'Benefit from the pull of the thriving commercial area of Pelhar, Nalasopara.',
    }, 
    {
        imageUrl: 'https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/11/28114332/Zain-Business-Square-in-Nalasopara-East-Mumbai-3-928x623-1.png',
        title: 'Growth-Driven Design',
        description: 'With the possession date slated for 30/11/25, this structure is built to support your ambitions.',
    },
    {
        imageUrl: 'https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/11/28120324/Zain-Business-Square-in-Nalasopara-East-Mumbai-2-1.png',
        title: 'Be the Benchmark',
        description: 'Set the standard with an enviable location for your business.',
    },
  ],
  'Unique-Youtopia-Central-Kharadi-Pune-Maharashtra': [
      {
          imageUrl: 'https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/12/04081252/Youtopia_1.png',
          title: 'An Investment in Happiness',
          description: 'Secure a future filled with joy, comfort, and pride of ownership in Central Kharadi!',
      },
      {
        imageUrl: 'https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/12/04081320/Youtopia_2.png',
        title: 'Designed For Shared Joy',
        description: 'Amenities that encourage community interaction and shared happiness',
    },
    {
        imageUrl: 'https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/12/04083822/Youtopia_3.png',
        title: 'Celebrate Nature',
        description: 'Enjoy landscaped gardens that bring nature closer to you.',
    },
    {
        imageUrl: 'https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/12/04083906/Youtopia_4.png',
        title: 'Kid-Centric Facilities',
        description: 'Let your young ones develop curiosity at every turn.',
    },
    {
        imageUrl: 'https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/12/04083946/Youtopia_5.png',
        title: 'Fitness At Your Doorstep',
        description: 'State of the art gym’s mean no commute to wellness.'
    }
  ],
  'godrej-green-cover-baner-mahalunge%20road-pune-maharashtra': [
      {
          imageUrl: 'https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/12/02132943/GODREJ-GREEN-2.png',
          title: 'Luxury Is Now Affordable',
          description: 'Indulge in upscale living starting at just INR 54.38 Lakh.',
      },
      {
          imageUrl: 'https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/12/02133530/GODREJ-GREEN.png',
          title: 'Riverside Relaxation Every Day',
          description: 'Let the calming sound of water soothe your senses after a long day.',
      },
      {
        imageUrl: 'https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/12/02132958/GODREJ-GREEN-3.png',
        title: 'Breathe Green',
        description: 'Experience the perfect blend of serene nature and urban convenience, ready for possession by 31/12/24.',
    },
    {
        imageUrl: 'https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/12/02133021/GODREJ-GREEN-4.png',
        title: 'Invest in Growth',
        description: 'Situated on Baner-Mahalunge Road, Pune, in a thriving area with exceptional appreciation potential.',
    },
   
    
  ],
  'luxury-villas-satirje-alibaug-iraah-lifespaces': [
      {
          imageUrl: 'https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/12/05053107/Image-Gallery-See-all-6-photos-Iraah-Lifespaces-GREEN-5.png',
          title: 'Experience it here',
          description: 'At Iraah Lifespaces',
      },
      {
          imageUrl: 'https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/12/05053309/Image-Gallery-See-all-6-photos-Iraah-Lifespaces-GREEN.png',
          title: 'Elite Lifestyle Blueprint Starting at INR 18 Cr',
          description: 'Designed for those who value sophistication, exclusivity, and a gorgeous escape.',
      },
      {
        imageUrl: 'https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/12/05053615/Image-Gallery-See-all-6-photos-Iraah-Lifespaces-GREEN-2-1.png',
        title: 'Designed for the Discerning',
        description: 'Limited to only two villas, offering a rare and unrivaled sense of exclusivity.',
    },
    {
        imageUrl: 'https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/12/05053615/Image-Gallery-See-all-6-photos-Iraah-Lifespaces-GREEN-4-1.png',
        title: 'A Place for Generations',
        description: 'Your villa is a timeless treasure, designed to be cherished by the generations to come.',
    },
    {
        imageUrl: 'https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/12/05054310/Image-Gallery-See-all-6-photos-Iraah-Lifespaces-GREEN-3.png',
        title: 'Synchronized with Seasons',
        description: 'Enjoy a villa in Satirje, Alibaug that feels alive, reflecting nature’s changing moods.',
    },

  ],
  'paris-olympics': [
      {
          imageUrl: 'https://images.timesproperty.com/webstories_manage/1729590450IMG_0076.webp',
          title: 'Wayanad Landslides - Story 1',
          description: 'This is the first story description for Wayanad landslides.',
      },
      {
          imageUrl: 'https://images.timesproperty.com/webstories_manage/1653384775_Picture2.jpg',
          title: 'Wayanad Landslides - Story 2',
          description: 'This is the second story description for Wayanad landslides.',
      },
  ],
  // Add more stories here...
};

const StoryEffect = () => {
    const { slug } = useParams(); // Get the slug dynamically
    const [stories, setStories] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [showForm, setShowForm] = useState(false); // Track if the form should be displayed


    // Load stories dynamically based on slug
    useEffect(() => {
        if (slug) {
            const selectedStories = storiesBySlug[slug];
            setStories(selectedStories || []);
            setCurrentIndex(0); // Reset to the first story when slug changes
            setProgress(0); // Reset progress bar
        }
    }, [slug]);

    // Progress bar handling
    useEffect(() => {
        if (showForm) return; // Stop updates if the form is visible


        const interval = setInterval(() => {
            setProgress((prev) => prev + 1);
        }, 50); // Adjust interval duration for smoother progress

        if (progress >= 100) {
            nextStory(); // Move to the next story when progress completes
        }

        return () => clearInterval(interval); // Clear interval on unmount
    }, [progress]);

    // const nextStory = () => {
    //     setProgress(0); // Reset progress
    //     setCurrentIndex((prevIndex) =>
    //         prevIndex < stories.length - 1 ? prevIndex + 1 : 0
    //     ); // Loop to the first story after the last one
    // };

    const nextStory = () => {
        if (currentIndex < stories.length - 1) {
            setProgress(0);
            setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
            setShowForm(true); // Show form after last story
        }
    };
    

    const prevStory = () => {
        setProgress(0); // Reset progress
        setCurrentIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : stories.length - 1
        ); // Loop to the last story if on the first one
    };

    if (stories.length === 0) {
        return <div>Loading or No Stories Found</div>;
    }
    return (
        <div className="story-container">
            <div className="phone-frame">
                {showForm ? (
                    <div className="form-slide">
                       <Form delay={0} /> 
                    </div>
                ) : (
                    <>
                        {/* Progress Bar */}
                        <div className="progress-container">
                            <div
                                className="progress-bar"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
    
                        {/* Story Content */}
                        <img
                            className="background-image"
                            src={stories[currentIndex]?.imageUrl}
                            alt={`Story ${currentIndex + 1}`}
                        />
                        <div className="story-content">
                            <h2 className="story-title">{stories[currentIndex]?.title}</h2>
                            <p className="story-description">
                                {stories[currentIndex]?.description}
                            </p>
                        </div>
    
                        {/* Navigation Buttons */}
                        <button className="left-arrow" onClick={prevStory}>
                            &#10094;
                        </button>
                        <button className="right-arrow" onClick={nextStory}>
                            &#10095;
                        </button>
                    </>
                )}
            </div>
        </div>
    );
    
    
};

export default StoryEffect;
