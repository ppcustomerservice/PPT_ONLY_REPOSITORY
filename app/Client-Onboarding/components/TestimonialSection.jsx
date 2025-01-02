import Image from "next/image";
import styles from "./TestimonialSection.module.css";
import { useState } from "react";

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Kamatvd",
      location: "",
      image: "https://www.propertyplateau.com/wp-content/uploads/2024/03/unnamed-1.png",
      text: "Highly professional. Very much reachable. Display good options as per individual requirements.",
    },
    {
      name: "Amanda Vaz",
      location: "",
      image: "https://www.propertyplateau.com/wp-content/uploads/2024/03/unnamed-2.png",
      text: "Highly professional. Sylvester has always been reachable and has shown good options as per individual requirements.",
    },
    {
      name: "prithviraj guha",
      location: "",
      image: "https://www.propertyplateau.com/wp-content/uploads/2024/03/unnamed.png",
      text: "Property Plateau is a very professional property consultant where their representatives like Mr. Silvester are very proficient in showing the properties and have complete understanding of customer needs. My interaction with the company was a great experience when i purchased few offices at a prime location in Goa. I wish them all the  best for their future endeavours. 👍",
    },
   
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className={styles.testimonialSection}>
      <h2 className={styles.heading}>This is what the owners say about us</h2>
      <div className={styles.sliderContainer}>
        <button onClick={prevSlide} className={styles.navButton}>&lt;</button>
        <div className={styles.testimonialsRow}>
          {[0, 1, 2].map((offset) => {
            const index = (currentIndex + offset) % testimonials.length;
            return (
              <div className={styles.testimonialCard} key={index}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={testimonials[index].image}
                    alt={`${testimonials[index].name}'s picture`}
                    width={60}
                    height={60}
                    className={styles.image}
                  />
                </div>
                <div className={styles.testimonialContent}>
                  <p className={styles.text}>{testimonials[index].text}</p>
                  <p className={styles.name}>{testimonials[index].name}</p>
                  <p className={styles.location}>{testimonials[index].location}</p>
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={nextSlide} className={styles.navButton}>&gt;</button>
      </div>
    </section>
  );
};

export default TestimonialSection;