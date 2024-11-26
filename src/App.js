import React from 'react';
import Navbar from './components/Navbar';
import Pages from './pages/Pages';
import Footer from './components/Footer';

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Pages />
      <Footer />
    </main>
  );
}

export default App;
