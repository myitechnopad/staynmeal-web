import React, { useState } from 'react';
import logo from '../assets/logo.png';
import api from '../api/axios';
import { Phone } from "lucide-react";
const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    query_type: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Valid 10-digit mobile number is required';
    }
    if (!formData.query_type) newErrors.query_type = 'Please select query type';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        await api.post('/contact', formData);
        setSubmitted(true);
      } catch (error) {
        console.error('Error submitting contact form:', error);
        // You can add error UI here if needed
      }
    }
  };


  if (submitted) {
    return (
      <div className="pt-20 max-w-xl mx-auto px-4 py-10 text-center">
        <h2 className="text-lg font-semibold text-green-700">Thank you!</h2>
        <p className="text-gray-600">Your message has been submitted.</p>
      </div>
    );
  }

  return (
    <div className="py-2 pt-20 max-w-xl mx-auto px-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-green-700 mt-2">
          Stay<span className="font-bold" style={{ color: '#ffc107' }}>N</span>Meal
        </h2>
        <p className="text-gray-600 text-sm mt-1">We'd love to hear from you!</p>
      </div>

      <form onSubmit={handleSubmit} className="py-0 space-y-4 bg-white border border-gray-200 rounded-md shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>
        </div>

        <div>
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile}</p>}
        </div>

        <div>
          <select
            name="query_type"
            value={formData.query_type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          >
            <option value="">Select Query Type</option>
            <option value="Feedback">Feedback</option>
            <option value="RFI">Request for Information</option>
            <option value="General">General</option>
          </select>
          {errors.query_type && <p className="text-red-500 text-xs">{errors.query_type}</p>}
        </div>

        <div>
          <textarea
            name="message"
            rows={3}
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white text-sm py-1 rounded-md hover:bg-green-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;
