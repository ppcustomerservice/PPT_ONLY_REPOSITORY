"use client";
import "./globals.css";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NewsArticle from "../components/News_Article";

import TrendingProjects from "../components/TrendingProjects";
import Reel from "../components/Reel";
import MarqueeTag from "../components/MarqueeTag";
import AdvertismentLRRibbon from "../components/AdvertismentLR_Ribbon";
import Inshorts from "../components/Inshorts";
import PropertySlider from "../components/PropertySlider";
import Footer from "../components/Footer";
import RealEstateFeaturedCards from "../components/RealEstateFeaturedCards";
import HomeLoanCalculator from "../components/calculator";
import AQIwidget from "../components/AQIwidget";

const HomePage: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Avoid mismatch errors

  return (
    <div>
      <Navbar />
      <MarqueeTag />
      <RealEstateFeaturedCards />
     {/* AQI Widget Included Here */}
      <Reel />
      <NewsArticle />
      <AQIwidget /> 
      <PropertySlider regionId={60} />
      <TrendingProjects />
      <HomeLoanCalculator />
      <AdvertismentLRRibbon />
      <Inshorts />
      <Footer />
    </div>
  );
};

export default HomePage;
