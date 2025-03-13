"use client"; 

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; 
import './Inshorts.css'; 

const ImageGrid = () => {
    const items = [
        {
            slug: 'business-square-in-nalasopara-mumbai-maharashtra',
            url: 'https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/11/28035142/Zain-Business-Square-in-Nalasopara-East-Mumbai-1-835x467-1.png',
            caption: 'Looking for premium warehouse space in Nalasopara, Mumbai?',
        },
        {
            slug: 'Unique-Youtopia-Central-Kharadi-Pune-Maharashtra',
            url: 'https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/12/02123032/Caption_Youtopia.png',
            caption: 'Want to buy a luxury 2 or 2.5 BHK flat in Central Kharadi, Pune?',
        },
        {
            slug: 'godrej-green-cover-baner-mahalunge%20road-pune-maharashtra',
            url: 'https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/12/02123803/Caption_GODREJ-GREEN.png',
            caption: 'Thinking of purchasing a 1, 2 or 3 BHK flat at Baner-Mahalunge Road in Pune?',
        },
        {
            slug: 'luxury-villas-satirje-alibaug-iraah-lifespaces',
            url: 'https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/12/05052906/CaptionImage-Gallery-See-all-6-photos-Iraah-Lifespaces.png',
            caption: 'Imagining a lavish home in Alibaug’s elite locale?',
        },
        {
            slug: 'paris-olympics',
            url: 'https://th-i.thgim.com/public/incoming/dawyx5/article68452900.ece/alternates/PORTRAIT_230/2162986023.jpg',
            caption: 'Watch: Eiffel Tower dazzles at opening ceremony of Paris Olympics',
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex < items.length - 3 ? prevIndex + 1 : 0
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : items.length - 3
        );
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds

        return () => clearInterval(interval); // Cleanup function to clear interval on unmount
    }, []);

    return (
        <div className="carousel-container">
            <h1 className="section-title">Prop Shorts</h1>
            <div className="carousel">
                <button className="prev" onClick={prevSlide}>&#10094;</button>
                <div className="carousel-track">
                    {items.slice(currentIndex, currentIndex + 3).map((item, index) => (
                        <div className="card1" key={index}>
                            <Link href={`/propshorts/${item.slug}`}>
                                <div className="image-container">
                                    <img src={item.url} alt={item.caption} className="main-image" />
                                    <div className="overlay"></div>
                                    <div className="progress-bar"></div>
                                    <p className="caption">{item.caption}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <button className="next" onClick={nextSlide}>&#10095;</button>
            </div>
           
        </div>
    );
};

export default ImageGrid;
