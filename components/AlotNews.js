"use client";  // This marks the component as a Client Component
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Defining a maximum width to avoid overlapping and full width coverage
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px;
  max-width: 2000px;
  margin: 0 auto;
  background-color:#e5e7eb; 
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 100px;
  }
`;

const NewsContainer = styled.div`
  flex:0 0 68%;
   max-width: 800px; /* Restrict content width */
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const NewsItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
border-bottom: 1px solid #cccccc;

  padding: 10px 0;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    flex-direction: column; /* Change to column layout only on mobile */
    align-items: flex-start;
  }
`;

const NewsText = styled.div`
  flex: 1;
`;

const NewsTitle = styled.h2`
  font-size: 1.5em;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

const NewsContent = styled.p`
  font-size: 1em;
  margin: 5px 0;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

const NewsUpdated = styled.span`
  font-size: 0.9em;
  color: #888;

  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`;

const Image = styled.img`
  width: 150px;
  height: 100px;
  object-fit: cover;
  margin-left: 10px;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-top: 10px;
  }
`;

const AdContainer = styled.div`
 flex:0 0 28%;
    max-width: 300px; /* Restrict ad width */
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 20px;
  }
`;

const fadeInOut = keyframes`
  0% { opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; }
`;

const AdvertisementImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  animation: ${fadeInOut} 9s infinite;
`;

const App = () => {
  const ads = [
    'https://www.propertyplateau.com/wp-content/uploads/2024/07/1522572088058487343-1.png',
    'https://www.propertyplateau.com/wp-content/uploads/2024/07/1522572088058487343-1.png',
    'https://www.propertyplateau.com/wp-content/uploads/2024/07/1522572088058487343-1.png'
  ];

  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prevAd) => (prevAd + 1) % ads.length);
    }, 9000); // Change ad every 9 seconds

    return () => clearInterval(interval);
  }, [ads.length]);

  return (
    <Container>
      <NewsContainer>
        <NewsItem>
          <NewsText>
            <NewsTitle>DLF's growth potential anchors market confidence, brick by brick</NewsTitle>
            <NewsContent>Constructing value: With fortified finances, real estate major builds on sector consolidation.</NewsContent>
            <NewsUpdated>Updated On : 28 Jul 2024 | 9:36 PM IST</NewsUpdated>
          </NewsText>
          <Image src="https://bsmedia.business-standard.com/_media/bs/img/article/2024-07/28/full/1722182732-9488.jpg?im=FeatureCrop,size=(328,185)" alt="news" />
        </NewsItem>
        <NewsItem>
          <NewsText>
            <NewsTitle>DLF's growth potential anchors market confidence, brick by brick</NewsTitle>
            <NewsContent>Constructing value: With fortified finances, real estate major builds on sector consolidation.</NewsContent>
            <NewsUpdated>Updated On : 28 Jul 2024 | 9:36 PM IST</NewsUpdated>
          </NewsText>
          <Image src="https://bsmedia.business-standard.com/_media/bs/img/article/2024-07/28/full/1722182732-9488.jpg?im=FeatureCrop,size=(328,185)" alt="news" />
        </NewsItem>
        <NewsItem>
          <NewsText>
            <NewsTitle>DLF's growth potential anchors market confidence, brick by brick</NewsTitle>
            <NewsContent>Constructing value: With fortified finances, real estate major builds on sector consolidation.</NewsContent>
            <NewsUpdated>Updated On : 28 Jul 2024 | 9:36 PM IST</NewsUpdated>
          </NewsText>
          <Image src="https://bsmedia.business-standard.com/_media/bs/img/article/2024-07/28/full/1722182732-9488.jpg?im=FeatureCrop,size=(328,185)" alt="news" />
        </NewsItem>
        <NewsItem>
          <NewsText>
            <NewsTitle>DLF's growth potential anchors market confidence, brick by brick</NewsTitle>
            <NewsContent>Constructing value: With fortified finances, real estate major builds on sector consolidation.</NewsContent>
            <NewsUpdated>Updated On : 28 Jul 2024 | 9:36 PM IST</NewsUpdated>
          </NewsText>
          <Image src="https://bsmedia.business-standard.com/_media/bs/img/article/2024-07/28/full/1722182732-9488.jpg?im=FeatureCrop,size=(328,185)" alt="news" />
        </NewsItem>
        
      </NewsContainer>
      <AdContainer>
        <AdvertisementImage src={ads[currentAd]} alt="Advertisement" />
      </AdContainer>
    </Container>
  );
};

export default App;
