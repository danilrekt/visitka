import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Stack from './components/Stack.jsx'
import Projects from './components/Projects.jsx'
import Flow from './components/Flow.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Stack />
        <Projects />
        <Flow />
      </main>
      <Contact />
    </>
  )
}
