import React from "react";
import "./FAQ.css"; // Import the single CSS file

const FAQ = () => {
  const faqs = [
    {
      question: "Why should I trust Property Plateau for buying my dream property?",
      answer:
        "At Property Plateau, we prioritize transparency and customer satisfaction. Our experienced team ensures that every property listed is thoroughly verified for legal and financial clarity. Plus, we provide personalized assistance throughout the buying process, making it hassle-free for you.",
    },
    {
      question: "How does Property Plateau offer unmatched prices?",
      answer:
      "We negotiate directly with property developers and owners to secure the best deals for our customers. By cutting out middlemen and leveraging our market expertise, we pass these cost savings directly to you.",
  },
    {
      question:
        "What makes the Property Plateau experience unique?",
      answer:
        "We offer end-to-end property solutions, including free site visits, instant callbacks, and dedicated assistance for every step of your property search. Whether it's shortlisting, visiting, or closing deals, we ensure a seamless and efficient experience.",
    },
    // {
    //   question:
    //     "Which projects of Nanu Estate Pvt. Ltd. are available for sale below 1 Cr?",
    //   answer:
    //     "Sapana Raj Valley are some great project to choose from by Nanu Estate Pvt. Ltd. With wonderful locations, great connectivity and nearby hotspots, these Nanu Estate Pvt. Ltd. projects will surely suit your needs.",
    // },
  ];

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <div className="faq-label-container">
            <span className="faq-label faq-ques">Ques</span>
            <span className="faq-question">
              <strong>{faq.question}</strong>
            </span>
          </div>
          <div className="faq-label-container">
            <span className="faq-label faq-ans">Ans</span>
            <span className="faq-answer">{faq.answer}</span>
          </div>
          {index !== faqs.length - 1 && <hr className="faq-divider" />}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
