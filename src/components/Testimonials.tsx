import React from 'react';

interface Testimonial {
  name: string;
  title: string;
  quote: string;
  rating: number;
  avatar: string;
}

function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: 'Priya S.',
      title: 'Student',
      quote: 'StayNMeal made finding my PG in Wakad so simple! The chatbot was incredibly helpful.',
      rating: 5,
      avatar: 'https://via.placeholder.com/50?text=PS',
    },
    {
      name: 'Ramesh K.',
      title: 'PG Owner',
      quote: 'Listing my property was easy, and I received quality leads almost instantly. Great platform!',
      rating: 5,
      avatar: 'https://via.placeholder.com/50?text=RK',
    },
    {
      name: 'Anjali V.',
      title: 'Working Professional',
      quote: 'Found a great rental flat and tiffin service through StayNMeal. Highly recommend!',
      rating: 4,
      avatar: 'https://via.placeholder.com/50?text=AV',
    },
  ];

  return (
    <section className="hidden bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-10">
          What Our Users Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-green-100 p-6 rounded-xl shadow hover:shadow-md transition duration-200"
            >
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-green-800">
                {testimonial.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2 italic">
                {testimonial.title}
              </p>
              <div className="text-yellow-400 mb-3">
                {'⭐'.repeat(testimonial.rating)}
              </div>
              <p className="text-gray-700 text-sm">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
