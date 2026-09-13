import { useEffect, useRef } from 'react';
import { Hero } from './components/Hero';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Header } from './components/Header';

function App() {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (overlayRef.current) return;

    const overlay = document.createElement('div');
    overlay.className = 'page-overlay';
    document.body.appendChild(overlay);
    overlayRef.current = overlay;

    requestAnimationFrame(() => {
      overlay.classList.add('page-overlay--visible');
      setTimeout(() => {
        overlay.classList.remove('page-overlay--visible');
        document.body.classList.add('page-enter');
      }, 200);
    });

    return () => {
      overlay.remove();
      overlayRef.current = null;
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <hr className="divider" />
        <Skills />
        <hr className="divider" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;