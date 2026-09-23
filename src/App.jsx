import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
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
        <About />
        <Stack />
        <Projects />
        <Flow />
      </main>
      <Contact />
    </>
  )
}
