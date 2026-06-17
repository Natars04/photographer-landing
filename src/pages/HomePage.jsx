import HeroCarousel from '../components/HeroCarousel';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';

export default function HomePage() {
  return (
    <main>
      <HeroCarousel />
      <About />
      <Portfolio />
      <Services />
      <Testimonials />
      <div id="contacts">
        <ContactForm />
      </div>
    </main>
  );
}
