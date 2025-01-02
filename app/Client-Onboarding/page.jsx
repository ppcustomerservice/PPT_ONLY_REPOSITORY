'use client';

import React from 'react';
import MultiStepForm from './components/MultiStepForm'; 
import Navbar from '../../components/Navbar'; 
import Faq from "./components/FAQ"
import TestimonialSection from "./components/TestimonialSection"

const Page = () => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        {/* <h1 className="text-2xl font-bold mb-6">Multi-Step Form</h1> */}
        <MultiStepForm />

        <Faq/>
        {/* <TestimonialSection/> */}
        
      

       

        
      </main>
    </div>
  );
};

export default Page;
