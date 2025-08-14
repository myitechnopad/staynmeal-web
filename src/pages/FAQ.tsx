// src/pages/FAQ.tsx
import React from 'react';

const faqs = [
  {
    question: "What is StayNMeal?",
    answer:
      "StayNMeal is an AI-powered platform that helps users find and list accommodation and meal services easily."
  },
  {
    question: "How can I list my PG or tiffin service?",
    answer:
      "Go to the 'List Service' section from the header or footer and submit your interest using the form provided."
  },
  {
    question: "Is it free to use the platform?",
    answer:
      "Yes, currently it's free for both seekers and providers during our early access phase."
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach us through the Contact Us page or WhatsApp support link in the footer."
  },
];

const FAQ: React.FC = () => {
  return (
    <div className="pt-20 max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-primary-green mb-8 text-center">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-semibold text-gray-800">{faq.question}</h2>
            <p className="text-gray-600 mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
