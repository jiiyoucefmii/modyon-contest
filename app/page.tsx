import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ContestForm from './components/ContestForm';
import Prizes from './components/Prizes';
import FAQ from './components/FAQ';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ContestForm />
      <Prizes />
      <FAQ/>
    </main>
  );
}