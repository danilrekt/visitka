import { Hero } from './components/Hero';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Header } from './components/Header';

function App() {
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
