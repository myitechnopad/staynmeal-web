import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="pt-20 max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-primary-green mb-6">Privacy Policy</h1>
      <p className="text-gray-700 mb-4">
        At StayNMeal, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our platform.
      </p>

      <h2 className="text-xl font-semibold text-primary-green mt-8 mb-2">1. Information We Collect</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>Personal Information (e.g., name, email, phone number)</li>
        <li>Location data (for service matching)</li>
        <li>Usage data (device, browser, page views)</li>
      </ul>

      <h2 className="text-xl font-semibold text-primary-green mt-8 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>To create and manage user accounts</li>
        <li>To connect seekers with service providers</li>
        <li>To improve our platform experience</li>
        <li>To send updates, newsletters, or promotional content (only if opted in)</li>
      </ul>

      <h2 className="text-xl font-semibold text-primary-green mt-8 mb-2">3. Sharing of Information</h2>
      <p className="text-gray-700 mb-4">
        We do not sell or rent your personal information to third parties. We may share data with trusted vendors or partners under strict confidentiality agreements, only when necessary for service delivery or compliance.
      </p>

      <h2 className="text-xl font-semibold text-primary-green mt-8 mb-2">4. Data Security</h2>
      <p className="text-gray-700 mb-4">
        We implement standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.
      </p>

      <h2 className="text-xl font-semibold text-primary-green mt-8 mb-2">5. Your Rights</h2>
      <p className="text-gray-700 mb-4">
        You may access, modify, or delete your personal information at any time. To do so, please contact us at <a href="mailto:support@staynmeal.com" className="text-blue-600 underline">support@staynmeal.com</a>.
      </p>

      <h2 className="text-xl font-semibold text-primary-green mt-8 mb-2">6. Changes to this Policy</h2>
      <p className="text-gray-700 mb-4">
        We may update this Privacy Policy from time to time. The latest version will always be available on our platform with the effective date.
      </p>

      <p className="text-gray-500 mt-8">Effective Date: July 25, 2025</p>
    </div>
  );
};

export default PrivacyPolicy;
