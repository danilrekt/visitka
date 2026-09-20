import { useEffect } from 'react';
import { Hero } from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Header } from './components/Header';

function App() {
  useEffect(() => {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null;
    document.documentElement.setAttribute('data-theme', saved || 'light');
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <hr className="divider" />
        <Skills />
        <hr className="divider" />
        <Projects />
        <hr className="divider" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;