import { useState } from 'react';
import About from './components/About';
import Academy from './components/Academy';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import InstagramGallery from './components/InstagramGallery';
import MobileBar from './components/MobileBar';
import Reviews from './components/Reviews';
import Services from './components/Services';

export default function App() {
  const [enquiry, setEnquiry] = useState({ occasion: '', key: 0 });

  const onEnquire = (occasion: string) => {
    setEnquiry((e) => ({ occasion, key: e.key + 1 }));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('contact')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Services onEnquire={onEnquire} />
        <Academy onEnquire={onEnquire} />
        <About />
        <InstagramGallery />
        <Reviews />
        <Contact occasion={enquiry.occasion} focusKey={enquiry.key} />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
