import React from 'react';
import { useHomeScroll } from '../hooks/useHomeScroll';

import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import ForSeekers from '../components/ForSeekers';
import ForProviders from '../components/ForProviders';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import PricingPage from './PricingPage'; 

import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Home() {
  useHomeScroll();
  const auth = useAuth();
  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }else{
    return (
      <>
        <section id="hero" className="scroll-mt-20"><HeroSection /></section>
        <section id="seekers" className="scroll-mt-20"><ForSeekers /></section>
        <section id="providers" className="scroll-mt-20"><ForProviders /></section>
        <section id="how-it-works" className="scroll-mt-20"><HowItWorks /></section>
        <section id="testimonials" className="scroll-mt-20"><Testimonials /></section>
        <section id="start" className="scroll-mt-20"><CallToAction /></section>
        <section id="pricing" className="scroll-mt-20"><PricingPage /></section>
      </>
    );
  }
}
