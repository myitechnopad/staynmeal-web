import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import api from '../api/axios';

type Feature = {
  id: number;
  name: string;
  description: string;
};

type PricingPlan = {
  id: number;
  name: string;
  price: number;
  applicable_for: string;
  description: string;
  features: Feature[];
};

const usePricingPlans = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await api.get('/pricing/plans');
        setPlans(res.data);
      } catch (err) {
        console.error('Error fetching pricing plans', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  return { plans, loading };
};

const PricingPage: React.FC = () => {
  const { plans, loading } = usePricingPlans();

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-4">Simple, Transparent Pricing</h1>
        <p className="text-center text-gray-600 mb-12 text-base max-w-2xl mx-auto">
          Choose a plan that fits your property and meal service business. No hidden charges. Start for free and upgrade anytime.
        </p>
        <h1 className="text-center text-6xl front-bold text-yellow-500 bg-white px-4 sm:px-6 lg:px-8">
          Coming soon ...
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading pricing plans...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className="rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition duration-300 p-6 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-bold text-green-800 mb-1">{plan.name}</h2>
                  <p className="text-sm text-gray-500 mb-4">{plan.description}</p>

                  <div className="text-3xl font-extrabold text-green-600 mb-4">
                    ₹{plan.price.toLocaleString('en-IN')}
                    <span className="text-sm font-normal text-gray-500"> / month</span>
                  </div>

                  <ul className="mb-6 space-y-2 text-sm">
                    {plan.features.map((feature) => (
                      <li key={feature.id} className="flex items-start text-gray-700">
                        <span className="mr-2 text-green-600">✔</span>
                        <span>{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant="default"
                  className="w-full bg-green-700 hover:bg-green-800 text-white text-sm font-semibold py-2 mt-auto rounded-full"
                >
                  {plan.price === 0 ? 'Start for Free' : 'Get Started'}
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingPage;
