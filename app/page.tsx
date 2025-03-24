import React from 'react';
import Navbar from '../components/Navbar';
import NewsArticle from '../components/News_Article';
import VideoAdvertisment from '../components/VideoAdvertisment';
import TrendingProjects from '../components/TrendingProjects';

import Reel from '../components/Reel';
import MarqueeTag from "../components/MarqueeTag";
import AdvertismentLRRibbon from '../components/AdvertismentLR_Ribbon';
import Inshorts from '../components/Inshorts';
import PropertySlider from '../components/PropertySlider';
import Footer from '../components/Footer'
import RealEstateFeaturedCards from '../components/RealEstateFeaturedCards'
import HomeLoanCalculator from "../components/calculator"
//import Form from '../components/Form'

const HomePage: React.FC = () => {
  // Example regionId for North Goa
  const regionId = 60; 

  return (
    <div>
      <Navbar />
      <MarqueeTag />
      <RealEstateFeaturedCards/>
      <Reel />
      <NewsArticle />
      <VideoAdvertisment />
      <PropertySlider regionId={regionId} /> 
      <TrendingProjects />
      <HomeLoanCalculator />
      <AdvertismentLRRibbon />
      <Inshorts/>
     {/* // <Form/> */}
      <Footer/>
    
    </div>
  );
};

export default HomePage;
