"use client"; // This will tell Next.js that this component should be rendered on the client

import React, { useEffect, useState } from 'react';
import './AdvertismentLR_Ribbon.css';

const Ribbons = () => {
    const [isFooterVisible, setFooterVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                setFooterVisible(entry.isIntersecting);
            },
            {
                root: null,
                threshold: 0.1, // When 10% of the footer is in view
            }
        );

        const footerElement = document.querySelector('.footer');
        if (footerElement) {
            observer.observe(footerElement);
        }

        return () => {
            if (footerElement) {
                observer.unobserve(footerElement);
            }
        };
    }, []);

    return (
        <>
            <div className={`left-ribbon ${isFooterVisible ? 'hidden' : ''}`}>
                <a href="https://api.whatsapp.com/send/?phone=919156091640&text=Hello,%20I%20want%20to%20advertise%20on%20Property%20Plateau%20Times&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
                    <img src="https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/12/06023220/ad.jpg" alt="Advertisement Ribbon Left" />
                </a>
            </div>
            <div className={`right-ribbon ${isFooterVisible ? 'hidden' : ''}`}>
                <a href="https://api.whatsapp.com/send/?phone=919156091640&text=Hello,%20I%20want%20to%20advertise%20on%20Property%20Plateau%20Times&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
                    <img src="https://propertyplateaumedia.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/12/06023220/ad.jpg" alt="Advertisement Ribbon Right" />
                </a>
            </div>
        </>
    );
};

export default Ribbons;
