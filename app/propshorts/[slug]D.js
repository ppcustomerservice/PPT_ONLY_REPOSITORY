// pages/propshorts/[slug].js
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import './Reel.css';

// Map slug to corresponding stories
const storiesBySlug = {
    'business-square-in-nalasopara-mumbai-maharashtra': [
        {
            imageUrl: 'https://images.timesproperty.com/webstories_manage/1653384775_Picture2.jpg',
            title: 'Bangladesh Violence - Story 1',
            description: 'This is the first story description for Bangladesh violence.',
        },
        {
            imageUrl: 'https://images.timesproperty.com/webstories_manage/1653457355_Picture8.jpg',
            title: 'Bangladesh Violence - Story 2',
            description: 'This is the second story description for Bangladesh violence.',
        },
        {
            imageUrl: 'https://images.timesproperty.com/webstories_manage/1653457355_Picture3.jpg',
            title: 'Bangladesh Violence - Story 3',
            description: 'This is the third story description for Bangladesh violence.',
        },
    ],
    'wayanad-landslides': [
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
    'realme-13-pro': [
        {
            imageUrl: 'https://images.timesproperty.com/webstories_manage/1653457355_Picture3.jpg',
            title: 'Realme 13 Pro - Story 1',
            description: 'This is the first story description for Realme 13 Pro.',
        },
        {
            imageUrl: 'https://images.timesproperty.com/webstories_manage/1653384775_Picture2.jpg',
            title: 'Realme 13 Pro - Story 2',
            description: 'This is the second story description for Realme 13 Pro.',
        },
    ],
    'india-bangladesh-relations': [
        {
            imageUrl: 'https://images.timesproperty.com/webstories_manage/1653384775_Picture2.jpg',
            title: 'India-Bangladesh Relations - Story 1',
            description: 'This is the first story description for India-Bangladesh relations.',
        },
        {
            imageUrl: 'https://images.timesproperty.com/webstories_manage/1653457355_Picture8.jpg',
            title: 'India-Bangladesh Relations - Story 2',
            description: 'This is the second story description for India-Bangladesh relations.',
        },
    ],
    'paris-olympics': [
        {
            imageUrl: 'https://images.timesproperty.com/webstories_manage/1653457355_Picture3.jpg',
            title: 'Paris Olympics - Story 1',
            description: 'This is the first story description for Paris Olympics.',
        },
        {
            imageUrl: 'https://images.timesproperty.com/webstories_manage/1653384775_Picture2.jpg',
            title: 'Paris Olympics - Story 2',
            description: 'This is the second story description for Paris Olympics.',
        },
    ],
};

const StoryEffect = () => {
    const router = useRouter();
    const { slug } = router.query;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const progressRef = useRef([]);

    const stories = storiesBySlug[slug] || []; // Get the stories based on the slug

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => prevProgress + 1);
        }, 50);

        if (progress >= 100) {
            nextStory();
        }

        return () => clearInterval(interval);
    }, [progress]);

    const nextStory = () => {
        setProgress(0);
        if (currentIndex < stories.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0); // Loop back to the first story
        }
    };

    const prevStory = () => {
        setProgress(0);
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(stories.length - 1);
        }
    };

    useEffect(() => {
        progressRef.current.forEach((progressBar, idx) => {
            if (progressBar) {
                progressBar.style.width = idx === currentIndex ? '0%' : '100%';
            }
        });

        if (progressRef.current[currentIndex]) {
            progressRef.current[currentIndex].style.transition = 'width 5s linear';
            progressRef.current[currentIndex].style.width = '100%';
        }
    }, [currentIndex]);

    return (
        <div className="story-container">
            <div className="phone-frame">
                <div className="progress-container">
                    {stories.map((_, idx) => (
                        <div
                            key={idx}
                            className="progress-bar"
                            ref={(el) => (progressRef.current[idx] = el)}
                        ></div>
                    ))}
                </div>
                {stories.length > 0 && (
                    <>
                        <img className="background-image" src={stories[currentIndex].imageUrl} alt="Story background" />
                        <div className="story-content">
                            <h2 className="story-title">{stories[currentIndex].title}</h2>
                            <p className="story-description">{stories[currentIndex].description}</p>
                        </div>
                    </>
                )}
                <button className="left-arrow" onClick={prevStory}>&#10094;</button>
                <button className="right-arrow" onClick={nextStory}>&#10095;</button>
            </div>
        </div>
    );
};

export default StoryEffect;
