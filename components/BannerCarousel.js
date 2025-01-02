import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Carousel.css'; // Import your custom CSS here

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'ondemand',
  };

  const slidesData = [
    {
      img: 'https://theguardiansindia.com/images/slider/slide-1.webp',
      title: 'Seek Professional Services',
      description: 'ONE-STOP-SHOP Solution For Real Estate',
      professionals: '1200+ Professional Experts'
    },
    {
      img: 'https://theguardiansindia.com/images/slider/slide-2.webp',
      title: 'Second Slide Title',
      description: 'Second Slide Description',
      professionals: 'Details about professionals for second slide'
    },
    // Add more slides as needed
  ];

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {slidesData.map((slide, index) => (
          <div key={index} className="slide">
            <img src={slide.img} alt={slide.title} className="slide-image" />
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <p>{slide.professionals}</p>
              <button className="view-more">View More</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
